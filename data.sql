INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`) VALUES
('Mot','Nguyen', 'mot@gmail.com', '1234'),
('Hai','Nguyen', 'hai@gmail.com', '1234'),
('Ba','Nguyen', 'ba@gmail.com', '1234'),
('Bon','Nguyen', 'bon@gmail.com', '1234'),
('Nam','Nguyen', 'nam@gmail.com', '1234');
INSERT INTO `restaurants` ( `name`, `description`,`user_id`) VALUES
('Pizza Hut','...',1),
('Haidilao','...',2),
('Mahwa','...',2);
INSERT INTO `restaurant_likes` ( `user_id`, `restaurant_id`,`created_at`) VALUES
(1,2,'2022-12-20 03:26:50'),
(1,3,'2022-12-20 03:26:50'),
(3,1,'2022-12-20 03:26:50'),
(4,1,'2022-12-20 03:26:50'),
(5,3,'2022-12-20 03:26:50');
INSERT INTO `rate_res` ( `user_id`, `restaurant_id`,`amount`,`date_rate`) VALUES
(1,2,4,'2022-12-20 03:26:50'),
(1,3,5,'2022-12-20 03:26:50'),
(3,1,2,'2022-12-20 03:26:50'),
(4,1,1,'2022-12-20 03:26:50'),
(5,3,3,'2022-12-20 03:26:50');
INSERT INTO `orders` ( `user_id`, `total_price`,`discount`,`status`) VALUES
(1,10000,0,1),
(2,20000,0,1);
INSERT INTO `food` ( `restaurant_id`, `category_id`,`name`,`description`,`price`) VALUES
(1,1,'Pizza hải sản','...',10000),
(1,2,'Pizza bò','...',10000);
(2,1,'Lẩu thái','...',50000),
(2,2,'Lẩu nấm','...',50000),
(3,1,'Lẩu hải sản','...',40000),
(3,2,'buffet','...',50000);
INSERT INTO `order_details` ( `order_id`, `food_id`,`quantity`,`discount`,`price`) VALUES
(1,1,1,0,10000),
(2,2,2,0,20000);

