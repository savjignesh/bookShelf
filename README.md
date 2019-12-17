# bookShelf
Single page application with API configuration

#HTML #CSS #JavaScript #Bootstrap 4

- Navbar: When the user is at the very top of the page the navigation bar is slightly transparent. As the user scrolls down the navbar becomes opaque and remains stuck to the top no matter how far down the user scrolls (see redlines for details).

- Hamburger menu: On small screens, the Navbar displays a hamburger icon on the right (the hamburger icon does no need to be functional). In widescreen this becomes 4 distinct links. 

- Search: Once a search term is entered and the search button is clicked (or Enter is pressed) you will use the Google Books API to return up to 12 results based on that search term. Here is the documentation for that: https://developers.google.com/books/docs/v1/using

- Skeleton results: Immediately after a user has committed a search, a dozen grayed out “mock” results (see in Redlines.pdf) will show up for 3secs. After these 3 secs and once the API server has responded with data, the “mock” results will be replaced by the regular results. 

- Book suggestions on page load: Every time a user commits a search, the site will store the book genre (Google Books calls them categories) of the very first book in that result. It will do this for the latest 5 searches conducted (so a max of 5 genres are stored, but always from the latest 5 searches by that user). If the user refreshes the page or revisits it at a later date, the site will randomly pick one of those genres and populate the search results automatically with the query word “the” plus the randomly chosen genre.

Example: User visits the page for the first time (no results displayed). User searches for “George Orwell” and the first item in the results is “1984” so the site stores the “Science Fiction” genre. User then searches “Tolkien” and gets “The Hobbit” as the first item in the results, so the site stores the “Fantasy” genre. Once again, the user searches “Neuromancer” and the site stores the “Science Fiction” genre again. When the user revisits the page a couple days later, the site has a 66% chance of choosing “Science Fiction” and a 33% chance of choosing “Fantasy” while immediately populating the search results with that randomly chosen genre.
