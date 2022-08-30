import React from 'react';
import CategoryItem from '../components/category-item/category-item.component';
import './directory.component.scss';

const Directory = ({ categories }) => {
  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Directory;
