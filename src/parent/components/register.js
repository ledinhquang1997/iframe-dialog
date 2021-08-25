import { KEY, ACTIONS } from '../../common/constants';
import { sendToIframe } from '../RPC';
class Registration {
  constructor({ serviceKey = '' }) {
    if (!serviceKey) {
      throw '[IframeDialog] serviceKey is required!';
    }
    this.serviceKey = serviceKey;
    this.messageEventHandler = this.messageEventHandler.bind(this);
  }

  messageEventHandler(e) {
    try {
      if (!e.data || !e.origin) {
        return;
      }
      const data = JSON.parse(e.data);

      if (typeof data[KEY.IFRAME_MESSAGE_OBJECT_KEY + this.serviceKey] !== 'undefined') {
        const {
          action,
          dataValue,
          windowName,
          origin: senderOrigin,
        } = data[KEY.IFRAME_MESSAGE_OBJECT_KEY + this.serviceKey];

        switch (action) {
          case ACTIONS.CONFIRM: {
            const { message, actionId } = dataValue;
            const isOK = confirm(message);
            if (isOK) {
              sendToIframe(ACTIONS.CONFIRM_OK, { actionId }, senderOrigin, windowName, this.serviceKey);
            } else {
              sendToIframe(ACTIONS.CONFIRM_NO, { actionId }, senderOrigin, windowName, this.serviceKey);
            }
            break;
          }

          case ACTIONS.ALERT: {
            const message = dataValue.message;
            alert(message);
            break;
          }

          case ACTIONS.PROMPT: {
            const { message, defaultValue = '', actionId } = dataValue;
            const promptValue = prompt(message, defaultValue);
            sendToIframe(
              ACTIONS.RETURN_PROMPT_VALUE,
              { promptValue, actionId },
              senderOrigin,
              windowName,
              this.serviceKey,
            );
            break;
          }

          default: {
            throw '[IframeDialog] action not valid';
          }
        }
      }
    } catch (e) {
      console.error('[IframeDialog][post message error]', e);
    }
  }

  register() {
    window.addEventListener('message', this.messageEventHandler, false);
  }

  unregister() {
    window.removeEventListener('message', this.messageEventHandler, false);
  }
}

export default Registration;
