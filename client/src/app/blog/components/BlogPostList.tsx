import React from 'react';

const posts = [
	{
		title: 'Maintenance 101: Caring for Your Virgin Hair',
		date: 'July 24, 2025',
		excerpt:
			'Learn the secrets to keeping your bundles silky, shiny, and tangle-free for months...',
	},
	{
		title: 'Wig Installation Tips for Beginners',
		date: 'July 20, 2025',
		excerpt: 'Achieve a flawless melt with our step-by-step guide to installing your HD lace wig at home...',
	},
	{
		title: 'The Dreamhair Community Event',
		date: 'July 15, 2025',
		excerpt:
			'A look back at our recent pop-up, celebrating beauty, confidence, and the launch of our sandal line...',
	},
];

const BlogPostList: React.FC = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2  gap-6'>
			{posts.map((post, index) => (
				<div
					key={index}
					className='bg-black/50 p-6 rounded-md shadow-lg hover:shadow-yellow-500/50 transition-shadow duration-300'>
					<h3 className='text-xl font-bold mb-2'>{post.title}</h3>
					<p className='text-sm text-white mb-2'>{post.date}</p>
					<p className='text-white'>{post.excerpt}</p>
				</div>
			))}
		</div>
	);
};

export default BlogPostList;