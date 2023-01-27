-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2023 at 11:03 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kitchenware`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_c` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_c`, `name`) VALUES
(1, 'set'),
(2, 'storage'),
(3, 'jugs'),
(4, 'cups'),
(5, 'glasses'),
(6, 'teapots'),
(7, 'plates');

-- --------------------------------------------------------

--
-- Table structure for table `footer`
--

CREATE TABLE `footer` (
  `id_f` int(10) NOT NULL,
  `href` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `footer`
--

INSERT INTO `footer` (`id_f`, `href`, `class`) VALUES
(1, 'https://www.facebook.com', 'fab fa-facebook-f'),
(2, 'https://www.instagram.com', 'fab fa-instagram'),
(3, 'https://www.youtube.com', 'fab fa-youtube'),
(4, 'sitemap.xml', 'fa fa-sitemap'),
(5, 'dokumentacija.pdf', 'fa fa-file');

-- --------------------------------------------------------

--
-- Table structure for table `img`
--

CREATE TABLE `img` (
  `id_i` int(10) NOT NULL,
  `src` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `alt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id_p` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `img`
--

INSERT INTO `img` (`id_i`, `src`, `thumbnail`, `alt`, `id_p`) VALUES
(1, 'img/teapot_storage_cup_rezerva.jpg', 'img/1623430457_small_teapot_storage_cup_rezerva.jpg', 'peach tea set', 1),
(2, 'img/plate3.jpg', '', 'decorative blue plate', 2),
(3, 'img/jug3.jpg', '', 'vintage 60s milk speckled jug', 3),
(4, 'img/glass3.jpg', '', 'absinthe cocktail glass', 4),
(5, 'img/glass1_set.jpg', '', 'blue martini glasses', 5),
(6, 'img/plate2_set.jpg', '', 'green glass plates', 6),
(7, 'img/jug2.jpg', '', 'denby jug ', 7),
(8, 'img/storage1_set.jpg', '', 'kitchen storage jars with flower print', 8),
(9, 'img/storage3.jpg', '', 'glass butter dish', 9),
(10, 'img/plate4.jpg', '', 'divided dish platter', 10),
(11, 'img/cup3_set.jpg', '', 'navy fruit print mugs', 11),
(12, 'img/jug1.jpg', '', 'small soviet creamer jug', 12),
(13, 'img/teapot_jug.jpg', '', 'teapot and small milk jug', 13),
(14, 'img/glass4_set.jpg', '', 'set of four tumbler glasses', 14),
(15, 'img/jug4.jpg', '', 'brick colored stone jug', 15),
(16, 'img/plate1.jpg', '', 'large french serving plate', 16),
(17, 'img/cup2_set.jpg', '', 'green glass mugs', 17),
(18, 'img/glass2_set.jpg', '', 'five yellow and gold small glasses', 18),
(19, 'img/teapot1.jpg', '', 'white medium teapot', 19),
(20, 'img/cup1.jpg', '', 'white cup with green floral print', 20),
(21, 'img/storage2_set.jpg', 'img/1623428784_small_storage2_set.jpg', 'two casserole pots', 21);

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `id_m` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`id_m`, `name`) VALUES
(1, 'glass'),
(2, 'ceramic'),
(3, 'wood'),
(4, 'stone');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id_msg` int(10) NOT NULL,
  `mail` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `msg` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id_msg`, `mail`, `msg`) VALUES
(2, 'aaa@mailinator.com', 'i ordered some plates they are amazing keep up the good work');

-- --------------------------------------------------------

--
-- Table structure for table `nav`
--

CREATE TABLE `nav` (
  `id_n` int(10) NOT NULL,
  `href` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `level` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nav`
--

INSERT INTO `nav` (`id_n`, `href`, `description`, `level`) VALUES
(1, 'index.php', 'about', 0),
(2, 'shop.php', 'shop', 0),
(3, 'register.php', 'register | login', 3),
(4, 'contact.php', 'contact', 3),
(5, 'author.php', 'author', 0),
(6, 'survey.php', 'survey', 1),
(7, 'logout.php', 'logout', 1),
(8, 'admin.php', 'admin', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id_o` int(10) NOT NULL,
  `id_u` int(10) NOT NULL,
  `total` decimal(65,2) NOT NULL,
  `o_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_o`, `id_u`, `total`, `o_date`) VALUES
(20, 3, '36.50', '2021-06-03 17:42:42'),
(21, 22, '48.70', '2021-06-08 16:38:05'),
(22, 3, '56.00', '2021-06-09 18:33:10');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_p` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(65,2) NOT NULL,
  `id_i` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_p`, `name`, `description`, `price`, `id_i`) VALUES
(1, 'Peach Tea Set', 'Peach tea set consisting of a teapot, a sugar container and four teacups that come with plates. The teapot doesn\'t come with a lid, but it fits perfectly with the lid that comes with the sugar container.', '28.00', 1),
(2, 'Decorative Blue Plate', 'This plate depicts a nice country scenery. It can be hung upon a wall or placed on the holder that comes with it. The diameter is 24cm.', '9.00', 2),
(3, '60s Speckled Milk Jug', 'Speckled milk jug from Palissy (a member of the Royal Worcester Group). Has an orange tan inside and a 60s pattern.', '11.00', 3),
(4, 'Absinthe Cocktail Glass', 'An absinthe glass that is as simple as it is elegant. Capacity: 0.27l.', '8.50', 4),
(5, 'Blue Martini Glasses', 'Set of two beautiful martini glasses in light blue. These gorgeous glasses will brighten your cocktail hour and make you feel fancy in your own home. The blues are slightly different shades on each glass which makes this a fun unique set. ', '19.00', 5),
(6, 'Set of 6 Depression Glass Plates', 'Set of translucent green glass plates made in the period 1929-1939, around the time of the Great Depression. Diameter: 7\'\' or approximately 18cm. No chips, cracks, or other structural damage.', '27.00', 6),
(7, 'Stoneware Denby Jug', 'This lovely stoneware milk jug, was designed by Albert Colledge. It was introduced in the 1950s, and produced until the late 1970s. It has a teal green glaze inside the jug. It stands about 10 cm high and holds one pint.', '15.00', 7),
(8, '70s Baking Ingredients Canisters', 'Pair of vintage baking ingredients canisters with wooden lids and hand painted flower design. Wood has a waxed finish. Each jar is 17cm / 7.5 inches high by 10cm / 4 inches wide. Hand wash jars only in warm soapy water due to age.', '21.00', 8),
(9, 'Glass Country Butter Dish', 'Reproduction glass butter dish with raised ribs. Comes with the tray and lid - no accessories included.', '7.50', 9),
(10, 'Amber Glass Divided Dish Platter', 'Starburst pattern, divided into four sections and 10\'\'/25.4 cm in diameter.', '11.00', 10),
(11, 'Navy Fruit Print Mugs', 'Pair of navy fruit print mugs from the 80s, the print designed by Angela Hulse. Height: 9cm, diameter: 8cm.\r\n', '9.75', 11),
(12, 'Small Soviet Creamer Jug', 'Polka dot creamer from the Soviet era. In excellent condition with no sign of use. Height: 9cm, capacity: 250ml.', '5.50', 12),
(13, 'Teapot and Small Milk Jug', 'Ceramic set with spotted pattern and subtle floral design.', '14.00', 13),
(14, 'Pressed Cut Tumbler Glasses', 'Set of four tumblers from the 60s. They\'re pressed glass and have a multiple starburst pattern cut into them.', '25.00', 14),
(15, 'Glazed Stone Jug', 'Glazed stone jug from the 30s. It is in good condition for its age, minor marks. Holds approximately one pint. Ideal as a milk jug, creamer or for custard. Would also look great filled with flowers. Height: 14cm, base diameter: 9cm.', '9.30', 15),
(16, 'Large French Serving Plate', 'A pink floral design in the centre of each plate with a duck egg blue/grey design around the rim. delicate colours and simple design. This plate comes from 50s France. Width: 30cm.', '9.00', 16),
(17, 'Green Glass Mugs', 'Perfect for a hot cocoa, these green glass mugs sit 4.5\'\'/11.43cm tall. The rim used to be gold and there\'s still a little gold on some of them, but it doesn\'t take away from their good looks.', '4.00', 17),
(18, 'Yellow and Gold Small Glasses', '60s set of five yellow and gold part frosted glass sherry glasses. Height. 7cm, diameter: 5cm. In excellent condition, aside from a slight wear on the gold rim.', '20.00', 18),
(19, 'Classic White Teapot', 'Pristine white teapot, 20cm in height.', '10.00', 19),
(20, 'Floral Print Cup', 'A medium sized cup, ideal for strong morning coffee.', '3.20', 20),
(21, 'Two Casserole Dishes', 'This set of two can be used as medium storage units, with 12cm in height and a diameter of 13cm.', '23.00', 21);

-- --------------------------------------------------------

--
-- Table structure for table `prod_cat`
--

CREATE TABLE `prod_cat` (
  `id_pc` int(10) NOT NULL,
  `id_p` int(11) NOT NULL,
  `id_c` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prod_cat`
--

INSERT INTO `prod_cat` (`id_pc`, `id_p`, `id_c`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 6),
(4, 1, 4),
(5, 2, 7),
(6, 3, 3),
(7, 4, 5),
(8, 5, 1),
(9, 5, 5),
(10, 6, 1),
(11, 6, 7),
(12, 7, 3),
(13, 8, 1),
(14, 8, 2),
(15, 9, 2),
(16, 10, 7),
(17, 11, 1),
(18, 11, 4),
(19, 12, 3),
(20, 13, 1),
(21, 13, 3),
(22, 13, 6),
(23, 14, 1),
(24, 14, 5),
(25, 15, 3),
(26, 16, 7),
(27, 17, 1),
(28, 17, 4),
(29, 18, 1),
(30, 18, 5),
(31, 19, 6),
(32, 20, 4),
(33, 21, 1),
(34, 21, 2);

-- --------------------------------------------------------

--
-- Table structure for table `prod_mat`
--

CREATE TABLE `prod_mat` (
  `id_pm` int(10) NOT NULL,
  `id_p` int(10) NOT NULL,
  `id_m` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prod_mat`
--

INSERT INTO `prod_mat` (`id_pm`, `id_p`, `id_m`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 2),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 4),
(8, 8, 2),
(9, 8, 3),
(10, 9, 1),
(11, 10, 1),
(12, 11, 2),
(13, 12, 2),
(14, 13, 2),
(15, 14, 1),
(16, 15, 4),
(17, 16, 2),
(18, 17, 1),
(19, 18, 1),
(20, 19, 2),
(21, 20, 2),
(22, 21, 2);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_answers`
--

CREATE TABLE `quiz_answers` (
  `id_qa` int(10) NOT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id_qq` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_answers`
--

INSERT INTO `quiz_answers` (`id_qa`, `answer`, `id_qq`) VALUES
(1, 'Yes', 1),
(2, 'No', 1),
(3, 'Yes', 2),
(4, 'No', 2),
(5, 'Region 1 - Northern Europe, Russia or Uzbekistan', 3),
(6, 'Region 2 - Europe (the rest of Europe)', 3),
(7, 'Region 3 - Africa, Asia or the Americas', 3),
(8, 'Region 4 - Australia', 3),
(9, 'Region 5 - New Zealand or Oceania', 3),
(10, 'Weekly', 4),
(11, 'It\'s fine as it is', 4),
(12, 'Every few months', 4);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id_qq` int(10) NOT NULL,
  `question` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id_qq`, `question`) VALUES
(1, 'Would you be interested in occasional auctions in our shop instead of fixed prices?'),
(2, 'Would you be interested in an expansion of products, which would include other housewares and decorative items not limited only to kitchen utensils?'),
(3, 'Check your region below. This information helps us to expand our shipping locations.'),
(4, 'As of right now, we post new arrivals every month. How often would it be most convenient for the shop updates to be?');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_user`
--

CREATE TABLE `quiz_user` (
  `id_qu` int(10) NOT NULL,
  `id_u` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_user`
--

INSERT INTO `quiz_user` (`id_qu`, `id_u`) VALUES
(4, 22);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_r` int(10) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_r`, `name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id_s` int(10) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_i` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id_s`, `title`, `caption`, `id_i`) VALUES
(1, 'hand picked', 'Each item is individually selected with love and utmost care, ensuring only the best vintage pieces leave our hands (and hearts) into yours.', 9),
(2, 'sustainable', 'We provide quality kitchen accessories that will serve you a long time, and extend our commitment to sustainability by shipping you orders in fully biodegradable and recyclable paper packaging.', 14),
(3, 'style', 'rustic &trade; kitchenware creates a timeless look and adds a nice touch to your kitchen space, blending into any style', 11);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_u` int(10) NOT NULL,
  `fullname` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_r` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_u`, `fullname`, `email`, `username`, `pass`, `id_r`) VALUES
(3, 'Admin Kitchenware', 'admin@kitchenware.com', 'admin', 'a88b8ba01c5f6131c2d207a51ac08399', 2),
(7, 'Update Test', 'test@update.com', 'test122', 'f88af5a2db1f9d29bb6984f96b98ae7a', 1),
(19, 'User Kitchenware', 'user@kitchenware.com', 'user', '928caa1f49da3da695da1291578948b0', 1),
(22, 'Test Name', 'testname@mailinator.com', 'test011', '95ddd7fc1f3b4a607744c058b7644124', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_c`);

--
-- Indexes for table `footer`
--
ALTER TABLE `footer`
  ADD PRIMARY KEY (`id_f`);

--
-- Indexes for table `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id_i`),
  ADD KEY `id_p` (`id_p`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id_m`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_msg`);

--
-- Indexes for table `nav`
--
ALTER TABLE `nav`
  ADD PRIMARY KEY (`id_n`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_o`),
  ADD KEY `id_u` (`id_u`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_p`),
  ADD KEY `id_i` (`id_i`);

--
-- Indexes for table `prod_cat`
--
ALTER TABLE `prod_cat`
  ADD PRIMARY KEY (`id_pc`),
  ADD KEY `id_c` (`id_c`),
  ADD KEY `id_p` (`id_p`);

--
-- Indexes for table `prod_mat`
--
ALTER TABLE `prod_mat`
  ADD PRIMARY KEY (`id_pm`),
  ADD KEY `id_p` (`id_p`),
  ADD KEY `id_m` (`id_m`);

--
-- Indexes for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD PRIMARY KEY (`id_qa`),
  ADD KEY `id_qq` (`id_qq`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id_qq`);

--
-- Indexes for table `quiz_user`
--
ALTER TABLE `quiz_user`
  ADD PRIMARY KEY (`id_qu`),
  ADD KEY `id_u` (`id_u`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_r`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id_s`),
  ADD KEY `id_i` (`id_i`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_u`),
  ADD KEY `id_r` (`id_r`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_c` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `footer`
--
ALTER TABLE `footer`
  MODIFY `id_f` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `img`
--
ALTER TABLE `img`
  MODIFY `id_i` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `id_m` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id_msg` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nav`
--
ALTER TABLE `nav`
  MODIFY `id_n` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_o` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id_p` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `prod_cat`
--
ALTER TABLE `prod_cat`
  MODIFY `id_pc` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `prod_mat`
--
ALTER TABLE `prod_mat`
  MODIFY `id_pm` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  MODIFY `id_qa` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id_qq` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `quiz_user`
--
ALTER TABLE `quiz_user`
  MODIFY `id_qu` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_r` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id_s` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_u` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_u`) REFERENCES `user` (`id_u`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_i`) REFERENCES `img` (`id_i`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prod_cat`
--
ALTER TABLE `prod_cat`
  ADD CONSTRAINT `prod_cat_ibfk_1` FOREIGN KEY (`id_c`) REFERENCES `category` (`id_c`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prod_cat_ibfk_2` FOREIGN KEY (`id_p`) REFERENCES `product` (`id_p`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prod_mat`
--
ALTER TABLE `prod_mat`
  ADD CONSTRAINT `prod_mat_ibfk_1` FOREIGN KEY (`id_m`) REFERENCES `material` (`id_m`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prod_mat_ibfk_2` FOREIGN KEY (`id_p`) REFERENCES `product` (`id_p`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD CONSTRAINT `quiz_answers_ibfk_1` FOREIGN KEY (`id_qq`) REFERENCES `quiz_questions` (`id_qq`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_user`
--
ALTER TABLE `quiz_user`
  ADD CONSTRAINT `quiz_user_ibfk_1` FOREIGN KEY (`id_u`) REFERENCES `user` (`id_u`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `slider`
--
ALTER TABLE `slider`
  ADD CONSTRAINT `slider_ibfk_1` FOREIGN KEY (`id_i`) REFERENCES `img` (`id_i`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_r`) REFERENCES `role` (`id_r`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
