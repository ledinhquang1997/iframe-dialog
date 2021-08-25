import { setParentOrigin, setServiceKey } from '../config-value';

export default function initialize({ parentOrigin, serviceKey }) {
  if (!serviceKey) {
    throw '[IframeDialog] Service key is required!';
  }

  if (!parentOrigin) {
    throw '[IframeDialog] Parent origin is required!';
  }

  setParentOrigin(parentOrigin);
  setServiceKey(serviceKey);
}
