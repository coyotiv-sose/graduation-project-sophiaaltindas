const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

async function main() {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Create an analogy for this phrase:\n\nQuestions are arrows in that:',
    temperature: 0.5,
    max_tokens: 3,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  console.log(response.data)
}

main()
