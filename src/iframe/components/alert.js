import { ACTIONS } from '../../common/constants';
import { sendToParent } from '../RPC';

export default function _alert({ message }) {
  sendToParent(ACTIONS.ALERT, {
    message,
  });
}
