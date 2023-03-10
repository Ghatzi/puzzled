import { Input } from '../components';

const Search = ({ search, setSearch }) => (
  <form className="mt-0" onSubmit={e => e.preventDefault()}>
    <Input
      inputType="text"
      inputId="search"
      inputPlaceholder="Search items..."
      inputRole="search"
      inputValue={search}
      handleChange={e => setSearch(e.target.value)}
    />
  </form>
);

export default Search;
