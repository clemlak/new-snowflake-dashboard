import React from 'react';

function Category({
  match,
}) {
  const { name } = match.params;

  return (
    <div>
      {match.params.name ? (
        <h1 className="title">
          {`${name} dApps`}
        </h1>
      ) : (
        <p>
          No param in query string, displaying default category
        </p>
      )}
    </div>
  );
}

export default Category;
