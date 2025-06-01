import { Client, Databases, Query, ID } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
  // Use Appwrite SDK to check if the search term exists in the database
  // If it does, update the count
  // If it doesnt create a new document with the each term and count as 1.
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", searchTerm)])

    if (result.documents.length > 0) {
      //check if there are any documents
      const doc = result.documents[0]

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, { count: doc.count + 1 })
    } else {
      //If it doesnt create a new document with the each term and count as 1.

      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { searchTerm, count: 1, movie_id: movie.id, poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` })
    }
  } catch (error) {
    console.error(error)
  }
  console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID)
}

export const getTrendingMovies = async () => {
  try {
    //console.log("queries:" + Query.limit(5).concat)
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc("count")])
    //console.log("documents: " + result.documents)
    return result.documents
  } catch (error) {
    console.error(error)
  }
}
