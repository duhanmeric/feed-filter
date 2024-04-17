Documentation
=============

This tool helps you to filter your XML feed (product catalog) with your desired filters. Main reason to build this tool is to help you to filter your feed with multiple filters.

Installation
------------

`git clone https://github.com/duhanmeric/feed-filter.git`  
`npm install`  
`npm run dev`

How It Works?
-------------

App downloads a file from a specified URL and writes it to a directory on the server. Here’s a breakdown:

1.  **URL Validation:**
    
    First, it checks if the URL from the form data is not empty. If it's empty, it throws an error stating that URL is required.
    
2.  **Directory and Path Setup:**
    
    It generates a unique random directory name using `crypto.randomUUID()` to avoid overwriting files. It then combines this directory with a base path and the directory name to construct a path where the file will be stored.
    
3.  **File Downloading:**
    
    The `downloadFile()` function is called with the URL and output path. It attempts to download the file using `Axios`, specifying that the response should be treated as a stream. If the directory does not exist, it creates it.
    
4.  **File Handling:**
    
    After downloading, the content type of the file is determined and the appropriate file extension is appended (only supports .xml). The file is then saved to the constructed path. It then converts this XML file to JSON and saves it to the same directory with the same name. It then redirects the user to `/filter` route.
    
    Until this part, this is what's happening in the `fs:`\
    ![file](/public/example_files.png)
    
5.  **Reading and Returning Data:**
    
    After desired filters is entered, the app applies these filters to the JSON file and creates a new JSON file with the filtered version. It then redirects user to `/file` route rendering the result.
    
    After this part, a new file added to `fs:`\
    ![file](/public/example_filtered.png)
    
6.  **Error Handling:**
    
    If any part of this process fails (such as during the download or file operation), it captures and throws relevant errors, providing feedback on what went wrong.
    
7.  **Deleting Your Files:**
    
    If you want to delete your files, you can click the delete button placed in the Header.
    
In Action
----------------------


<iframe width="100%" height="315" src="https://duhan.dev/feed-filter.mov" frameborder="0"  allowfullscreen></iframe>

For more detailed information you can visit my blog: [https://duhan.dev/posts/feed-filter/](https://duhan.dev/posts/feed-filter/)

Why not in production?
----------------------

Thanks to serverless environments, reading/writing a file from `fs` is limited. I could dockerize the app and deploy it to a server but effort would be too much for this simple app. So, I decided to keep it as a local development app.