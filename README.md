# Chainalysis-Project #
## Build Instructions: ##
1. Clone repository: `git clone https://github.com/CharlizeD18/Chainalysis.git`
2. `cd` into project directory: `cd Chainalysis`
3. `cd` into backend code: `cd server`
4. Install dependencies: `npm install`
5. Run backend: `node app.js`
6. Open a new terminal
7. `cd` into the frontend code: `cd client`
8. Install dependencies: `yarn install`
9. Run frontend: `yarn start`
10. At this stage, your browser should open but if it does not, navigate to http://localhost:3000/

## Questionnaire: ##
1. Are there any sub-optimal choices( or short cuts taken due to limited time ) in your implementation?
    * I hardcoded the BTC-USD and ETH-USD tickers since those are the ones we needed for this project, but 
    it would have been better to make it more generalizable and have a function that takes in the ticker pairs
    you want to compare. Additionally, I could have created more components for the front-end to result in more
    organized and modular code. 
2. Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)
    * Due to time contraints, no part is overdesigned.
3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
    * Since the Coinbase and Kraken API's have a rate limit of 2-3 requests per second, I would need to implement some sort
    of caching mechanism to scale with this constraint. I would add a cache that would store the result of the previous
    request, and if our next request is within a second of the previous request, we would grab the response from the cache. 
 4. What are some other enhancements you would have made, if you had more time to do this implementation
    * Currently, my solution only grabs the price when the page is first loaded/refreshed. If given more time, I would build
    the app so that it calls the api every second and caches the data as mentioned above so that it gives more immediate,
    real-time price values and recommendations. Additionally, I would want my code to support more exchanges and currency
    pairs. 
