import { getters } from '../../appConfig';

describe('#getters', () => {
  describe('#getWidgetColor', () => {
    it('returns correct value', () => {
      const state = { widgetColor: '#00bcd4' };
      expect(getters.getWidgetColor(state)).toEqual('#00bcd4');
    });
  });
  describe('#getReferrerHost', () => {
    it('returns correct value', () => {
      const state = { referrerHost: 'gladminds.co' };
      expect(getters.getReferrerHost(state)).toEqual('gladminds.co');
    });
  });
  describe('#getShowUnreadMessagesDialog', () => {
    it('returns correct value', () => {
      const state = { showUnreadMessagesDialog: true };
      expect(getters.getShowUnreadMessagesDialog(state)).toEqual(true);
    });
  });
  describe('#getIsUpdatingRoute', () => {
    it('returns correct value', () => {
      const state = { isUpdatingRoute: true };
      expect(getters.getIsUpdatingRoute(state)).toEqual(true);
    });
  });
});
