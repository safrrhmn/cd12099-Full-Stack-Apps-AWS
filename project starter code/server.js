import express from 'express';
import bodyParser from 'body-parser';
import {deleteLocalFiles, filterImageFromURL} from "./util/util.js";


// Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

app.get("/filteredimage", async (req, res) => {
  let requestUrl = req.query?.image_url;
  try {
    new URL(requestUrl);
  } catch (e) {
    res.status(400).send("Bad Request")
  }
  try {
    let image = await filterImageFromURL(requestUrl);
    res.sendFile(image);
    res.on("finish", () => deleteLocalFiles([image]))
  }catch (e){
    res.status(500).send("Unknown Exception.")
  }
});

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );

process.on('uncaughtException', function (err) {
  console.error(err);
});