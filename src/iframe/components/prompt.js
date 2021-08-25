import { KEY, ACTIONS } from '../../common/constants';
import { sendToParent } from '../RPC';
import { generateKey } from '../../common/utils';
import { getServiceKey } from '../config-value';

export default function _prompt({ message, okCallback, defaultValue }) {
  const actionId = generateKey();
  const serviceKey = getServiceKey();

  const eventHandler = (event) => {
    if (event && event.data) {
      try {
        const data = JSON.parse(event.data);

        if (typeof data[KEY.PARENT_MESSAGE_OBJECT_KEY + serviceKey] !== 'undefined') {
          const { action, dataValue } = data[KEY.PARENT_MESSAGE_OBJECT_KEY + serviceKey];

          if (dataValue.actionId !== actionId) {
            return;
          }

          if (action === ACTIONS.RETURN_PROMPT_VALUE) {
            const promptValue = dataValue.promptValue;
            okCallback && typeof okCallback === 'function' && okCallback(promptValue);
            window.removeEventListener('message', eventHandler);
          }
        }
      } catch (e) {
        console.error('[IframeDialog][Error when receive prompt result]', e);
      }
    }
  };
  window.addEventListener('message', eventHandler);

  sendToParent(ACTIONS.PROMPT, {
    message,
    defaultValue,
    actionId,
  });
}
