export default function re() {
  const spot = document.querySelector('.spot');
  const sidebar = document.querySelector('.nav-menu');
  // console.log(sidebar);
  if (sidebar) {
    // handler
    const handleScroll = entries => {
      const spotIsVisible = entries[0].isIntersecting;
      if (spotIsVisible) sidebar.classList.remove('sidebar-full');
      else sidebar.classList.add('sidebar-full');
    };

    // options
    const options = {
      root: null, // null means that root element = browser viewport.
      rootMargin: '0px', // margin around the browser viewport.
      threshhold: 0, // see below what 0 means.
    };

    // initialize and start the observer.
    const observer = new IntersectionObserver(handleScroll, options);
    observer.observe(spot);
  }
}
