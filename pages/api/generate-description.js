import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { productName, marketplace, condition } = req.body;
    let chatGptResponse;

    try {
      chatGptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `あなたは私の代わりに${marketplace} にて${productName} を出品するための商品名と商品説明文を日本語で生成してください。${productName}の状態は${condition}です。商品名を出力する前は「商品名：」と出力してください。商品説明文を出力する前は「商品説明文：」と出力してください。なお、同時に複数のフリマサイトで出品しているため、購入前にコメントをもらうように注意文を記述してください。`,
          },
        ],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      });
    } catch (err) {
      console.error('Error in POST to OpenAI:', err);
      
      // Log response data if it exists
      if (err.response) {
        console.error('Response data from OpenAI:', err.response.data);
      }
      
      // Log request if response was not received
      if (err.request) {
        console.error('Request made to OpenAI:', err.request);
      }
      
      // Return from the function if there is an error.
      return res.status(500).json({ error: err.message });
    }

    const fullResponse = chatGptResponse.data.choices[0].message.content;

    let [_, itemTitle, description] = fullResponse.split(/商品名：|商品説明文：/);

    itemTitle = itemTitle.trim();
    description = description.trim();

    console.log('Item Title:', itemTitle);
    console.log('Description:', description);

    res.status(200).json({ itemTitle, description });

  } catch (err) {
    if (err.response && err.response.data) {
      console.error(err.response.data);
      res.status(500).json({ error: err.response.data });
    } else {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}
