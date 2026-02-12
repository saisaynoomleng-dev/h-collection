import Form from 'next/form';
import { useState } from 'react';
import { Input } from '../ui/input';
import clsx from 'clsx';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Button } from '../ui/button';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  return (
    <Form action="/search" onSubmit={() => setQuery('')}>
      <div className="relative">
        <Input
          variant="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="query"
          className="relative"
        />
        <Button
          type="submit"
          variant="search"
          className={clsx('right-0 absolute')}
        >
          <HiMagnifyingGlass />
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
