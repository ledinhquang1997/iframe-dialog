import { KEY, ACTIONS } from '../../common/constants';
import { sendToParent } from '../RPC';
import { generateKey } from '../../common/utils';
import { getServiceKey } from '../config-value';

export default function _confirm({ message, okCallback, cancelCallback }) {
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

          switch (action) {
            case ACTIONS.CONFIRM_OK:
              okCallback && typeof okCallback === 'function' && okCallback();
              window.removeEventListener('message', eventHandler);
              break;
            case ACTIONS.CONFIRM_NO:
              cancelCallback && typeof cancelCallback === 'function' && cancelCallback();
              window.removeEventListener('message', eventHandler);
              break;
          }
        }
      } catch (e) {
        console.error('[IframeDialog][Error when receive confirm result]', e);
      }
    }
  };
  window.addEventListener('message', eventHandler);

  sendToParent(ACTIONS.CONFIRM, {
    message,
    actionId,
  });
}
