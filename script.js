const refs = {
  quoteContainer: document.getElementById('quote-container'),
  quoteText: document.getElementById('quote'),
  authorText: document.getElementById('author'),
  twitterBtn: document.getElementById('twitter'),
  newQuoteBtn: document.getElementById('new-quote'),
  loader: document.getElementById('loader'),
};

let apiQuotes = [];

function addLoadingSpinner() {
  refs.loader.hidden = false;
  refs.quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  refs.loader.hidden = true;
  refs.quoteContainer.hidden = false;
}

function newQuote() {
  addLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.text) {
    refs.authorText.textContent = 'Unknown Borito';
  }
  refs.authorText.textContent = quote.author;
  if (quote.text.length >= 50) {
    refs.quoteText.classList.add('long-quote');
  }
  refs.quoteText.classList.remove('long-quote');
  refs.quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

async function getQuotes() {
  addLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${refs.quoteText.textContent} - ${refs.authorText.textContent}`;
  window, open(twitterUrl, '_blank');
}

refs.newQuoteBtn.addEventListener('click', newQuote);
refs.twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
