import rapid from 'rapid-io'

const API_KEY = 'ZGVtby13cy1zZXJ2aWNlLnJhcGlkLmlv'

const RAPID_TODO_COLLECTION_NAME = '' // Add your collection name right here

const client = rapid.createClient(API_KEY)

export default client
export const todos = client.collection(RAPID_TODO_COLLECTION_NAME)
