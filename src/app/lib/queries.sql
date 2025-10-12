CREATE TABLE IF NOT EXISTS movie_list (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  year INT NOT NULL,
  poster_url TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS user_profiles (
  clerk_id TEXT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  avatar TEXT NOT NULL CHECK (
    avatar IN ('ghostface', 'jason', 'michaelmyers')
  )
)

CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id TEXT REFERENCES user_profiles(clerk_id),
  thoughts TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 and 5),
  movie_id INT REFERENCES movie_list(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
)

INSERT INTO movie_list (title, year, poster_url)
VALUES ('Hereditary', '2018', 'https://image.tmdb.org/t/p/w500/hjlZSXM86wJrfCv5VKfR5DI2VeU.jpg'), 
('Halloween', '1978', 'https://image.tmdb.org/t/p/w500/wijlZ3HaYMvlDTPqJoTCWKFkCPU.jpg'),
('Prom Night', '2008', 'https://image.tmdb.org/t/p/w500/pKSeyN02R5khphImEIpAdBjQgEP.jpg'),
('The Conjuring', '2013', 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg'),
('Scream', '1996', 'https://image.tmdb.org/t/p/w500/lr9ZIrmuwVmZhpZuTCW8D9g0ZJe.jpg'),
('Cloverfield', '2008', 'https://image.tmdb.org/t/p/w500/qIegUGJqyMMCRjkKV1s7A9MqdJ8.jpg'),
('It', '2017', 'https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg'),
('The Uninvited', '2009', 'https://image.tmdb.org/t/p/w500/1xQlzKUDLuCe3SUGIGL6K1PtldH.jpg'),
('Gonjiam Haunted Asylum', '2018', 'https://image.tmdb.org/t/p/w500/fNqlsmu2tiI1bXcpU31yjHPkiJz.jpg'),
('Blair Witch Project', '1999', 'https://image.tmdb.org/t/p/w500/9050VGrYjYrEjpOvDZVAngLbg1f.jpg'),
('28 Days Later', '2002', 'https://image.tmdb.org/t/p/w500/sQckQRt17VaWbo39GIu0TMOiszq.jpg'),
('I Know What You Did Last Summer', '1997', 'https://image.tmdb.org/t/p/w500/dQyaJx0SptDqvQcAewAr8FAtLB2.jpg'),
('Paranormal Activity', '2007', 'https://image.tmdb.org/t/p/w500/tmclkEpjeo4Zu564gf3KrwIOuKw.jpg'),
('The Amityville Horror', '2005', 'https://image.tmdb.org/t/p/w500/4D246dpe7yy2GvHI2IbpeqkUXry.jpg')

SELECT 
  posts.id,
  posts.thoughts,
  posts.rating,
  posts.created_at,
  user_profiles.first_name,
  user_profiles.last_name,
  user_profiles.avatar,
  movie_list.title AS movie_title,
  movie_list.poster_url
FROM posts
JOIN user_profiles ON posts.user_id = user_profiles.clerk_id
JOIN movie_list ON posts.movie_id = movie_list.id
ORDER BY posts.created_at DESC;