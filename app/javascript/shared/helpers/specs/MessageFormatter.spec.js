import MessageFormatter from '../MessageFormatter';

describe('#MessageFormatter', () => {
  describe('content with links', () => {
    it('should format correctly', () => {
      const message =
        'This is a test Message. [Gladminds](https://www.gladminds.co)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a test Message. <a href="#" class="link" rel="noreferrer noopener nofollow" target="_blank">Gladminds</a></p>'
      );
    });
    it('should format correctly', () => {
      const message =
        'This is a message';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a test Message. <a href="#" class="link" rel="noreferrer noopener nofollow" target="_blank">https://gladminds.co</a></p>'
      );
    });
    it('should not convert template variables to links when linkify is disabled', () => {
      const message = 'Hey {{customer.name}}, check gladminds.co';
      const formatter = new MessageFormatter(message, false, false, false);
      expect(formatter.formattedMessage).toMatch(
        '<p>Hey {{customer.name}}, check https://gladminds.co</p>'
      );
    });
  });

  describe('parses heading to strong', () => {
    it('should format correctly', () => {
      const message = '### opensource \n ## tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        `<h3>opensource</h3>
<h2>tool</h2>`
      );
    });
  });

  describe('content with image and has "cw_image_height" query at the end of URL', () => {
    it('should set image height correctly', () => {
      const message =
        'This is a test Message. ![](http://gladminds.co/gladminds-logo2.png?cw_image_height=24px)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a test Message. <img src="http://gladminds.co/gladminds-logo2.png?cw_image_height=24px" alt="" style="height: 24px;" /></p>'
      );
    });

    it('should set image height correctly if its original size', () => {
      const message =
        'This is a test Message. ![](http://gladminds.co/gladminds-logo2.png?cw_image_height=auto)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a test Message. <img src="http://gladminds.co/gladminds-logo2?cw_image_height=auto" alt="" style="height: auto;" /></p>'
      );
    });

    it('should not set height', () => {
      const message =
        'This is a test Message. ![](http://gladminds.co/gladminds-logo2)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>This is a test Message. <img src="http://gladminds.co/gladminds-logo2" alt="" /></p>'
      );
    });
  });

  describe('tweets', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'This is a test message';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@this is an message thanks @longnonexistenttwitterusername';
      expect(
        new MessageFormatter(message, true, false).formattedMessage
      ).toMatch(
        '<p><a href="http://twitter.com/gladminds" class="link" rel="noreferrer noopener nofollow" target="_blank">@gladminds</a> this is a test message thanks @longnonexistenttwitterusername</p>'
      );
    });

    it('should add links to #tags', () => {
      const message = '#this is a message';
      expect(
        new MessageFormatter(message, true, false).formattedMessage
      ).toMatch(
        '<p><a href="https://twitter.com/hashtag/gladminds" class="link" rel="noreferrer noopener nofollow" target="_blank">#gladminds</a> this is a message</p>'
      );
    });
  });

  describe('private notes', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'this is a test message';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@This is a test Message. thanks @longnonexistenttwitterusername';
      expect(
        new MessageFormatter(message, false, true).formattedMessage
      ).toMatch(message);
    });

    it('should add links to #tags', () => {
      const message = '#this is a message';
      expect(
        new MessageFormatter(message, false, true).formattedMessage
      ).toMatch(message);
    });
  });

  describe('plain text content', () => {
    it('returns the plain text without HTML', () => {
      const message =
        '<b>This is a test Message. https://gladminds.co</b>';
      expect(new MessageFormatter(message).plainText).toMatch(
        'This is a test Message. https://gladminds.co'
      );
    });
  });

  describe('#sanitize', () => {
    it('sanitizes markup and removes all unnecessary elements', () => {
      const message =
        '[xssLink](javascript:alert(document.cookie))\n[normalLink](https://google.com)**I am a bold text paragraph**';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        `<p>[xssLink](javascript:alert(document.cookie))<br />
<a href="https://google.com" class="link" rel="noreferrer noopener nofollow" target="_blank">normalLink</a><strong>I am a bold text paragraph</strong></p>`
      );
    });
  });
});
