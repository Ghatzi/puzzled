const Search = ({ search, setSearch }) => (
  <form onSubmit={e => e.preventDefault()}>
    <input
      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md mt-5 py-2 px-8 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
      placeholder="Search items..."
      type="text"
      id="search"
      role="search"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </form>
);

export default Search;
