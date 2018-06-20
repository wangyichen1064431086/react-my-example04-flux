jest.unmock('../js/stores/CommentStore');
jest.unmock('../js/constants/CommentConstants');
jest.unmock('object-assign');

import AppDispather from '../js/dispatcher/AppDispatcher';
import CommentStore from '../js/stores/CommentStore';
import CommentConstants from '../js/constants/CommentConstants';

describe('CommentStore', () => {
  it('shoud propagate comments when loaded successfully', () => {
    const commentList = [{
      name: 'John',
      content: 'It looks good!'
    }, {
      name: 'Jane',
      content: 'Good job, dude!'
    }];

    const listener = AppDispather.register.mock.calls[0][0];
    //TypeError: Cannot read property 'calls' of undefined

    listener({
      type: CommentConstants.LOAD_COMMENT_SUCCESS,
      payload: {
        comment: {
          commentList
        }
      }
    });

    expect(CommentStore.getComment()).toEqual(commentList);
  });
});
