import { KEY } from '../common/constants';
import { getParentOrigin, getServiceKey } from './config-value';

export function sendToParent(action, value) {
  const parentOrigin = getParentOrigin();
  const serviceKey = getServiceKey();

  if (!serviceKey) {
    throw '[IframeDialog] Service key is required! Must call initialize before using';
  }

  if (!parentOrigin) {
    throw '[IframeDialog] Parent origin is required! Must call initialize before using';
  }

  const data = {
    [KEY.IFRAME_MESSAGE_OBJECT_KEY + serviceKey]: {
      action,
      dataValue: value,
      windowName: window.name,
      origin: window.location.origin,
    },
  };

  window.parent && window.parent.postMessage(JSON.stringify(data), parentOrigin);
}
