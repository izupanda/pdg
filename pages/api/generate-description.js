import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { productName, marketplace, condition } = req.body;
  
    const chatGptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
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
    // ...
  }
  

    const fullResponse = chatGptResponse.data.choices[0].message.content;

    // assuming the format is "item title: [title] --- description: [description]"
    let [itemTitle, description] = fullResponse.split('---').map(str => str.trim());

    // Check if itemTitle and description are string, if not, convert them to string
    if (typeof itemTitle !== 'string') {
      itemTitle = JSON.stringify(itemTitle);
    }
    if (typeof description !== 'string') {
      description = JSON.stringify(description);
    }

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
