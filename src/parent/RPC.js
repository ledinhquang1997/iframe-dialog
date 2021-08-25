import { KEY } from '../common/constants';

export function sendToIframe(action, value, senderOrigin, windowName, serviceKey) {
  if (!senderOrigin) {
    throw '[IframeDialog] Iframe origin is required!';
  }

  if (!windowName) {
    throw '[IframeDialog] Iframe name is required!';
  }

  if (!serviceKey) {
    throw '[IframeDialog] Service key is required!';
  }

  const data = {
    [KEY.PARENT_MESSAGE_OBJECT_KEY + serviceKey]: {
      action,
      dataValue: value,
    },
  };

  document
    .querySelector('iframe[name="' + windowName + '"]')
    .contentWindow.postMessage(JSON.stringify(data), senderOrigin);
}
