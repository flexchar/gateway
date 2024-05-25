import type { ContentType } from '../../types/requestBody';

export function transformMessagePart(c: ContentType) {
  if (c.type === 'text') {
    return {
      text: c.text,
    };
  }

  if (c.type === 'image_url') {
    const { url } = c.image_url || {};

    if (!url) {
      // Shouldn't throw error?
      throw new Error('Image URL is required when using image_url type.');
    }

    // Example: data:image/png;base64,abcdefg...
    if (url.startsWith('data:')) {
      const [mimeTypeWithPrefix, base64Image] = url.split(';base64,');
      const mimeType = mimeTypeWithPrefix.split(':')[1];

      return {
        inlineData: {
          mimeType: mimeType,
          data: base64Image,
        },
      };
    }

    // This part is problematic because URLs are not supported in the current implementation.
    // Two problems exist:
    // 1. Only Google Cloud Storage URLs are supported.
    // 2. MimeType is not supported in OpenAI API, but it is required in Google Vertex AI API.
    // Google will return an error here if any other URL is provided.
    return {
      fileData: {
        mimeType: 'image/jpeg',
        fileUri: url,
      },
    };
  }

  throw new Error(
    `Unsupported content type encountered for Google AI: ${c.type}`
  );
}
