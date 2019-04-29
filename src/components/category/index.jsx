import React from 'react';

function Category({
  match,
}) {
  const { name } = match.params;

  return (
    <div>
      {match.params.name ? (
        <p>
          {`Displaying the category ${name}`}
        </p>
      ) : (
        <p>
          No param in query string, displaying default category
        </p>
      )}
    </div>
  );
}

export default Category;
