import { GetServerSideProps } from 'next';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Post[];
};

const SSRPage: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      <h1>Server-side Rendered Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return {
      props: {
        posts: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default SSRPage;