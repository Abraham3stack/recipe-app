function SearchBar({ search, setSearch, onSearch}) {
  return (
    <div className='flex flex-col sm:flex-row gap-3 mb-8'>
      <input type="text" 
        placeholder='Search for recipes...'
        className='flex-1 p-3 rounded-lg border border-gray-300'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
        onClick={onSearch}
        className='bg-green-500 text-white px-6 rounded-lg font-semibold cursor-pointer'>
        Search
      </button>
    </div>
  );
}

export default SearchBar;