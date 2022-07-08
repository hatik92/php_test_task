/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100422
 Source Host           : localhost:3306
 Source Schema         : books

 Target Server Type    : MySQL
 Target Server Version : 100422
 File Encoding         : 65001

 Date: 08/07/2022 18:53:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book_student
-- ----------------------------
DROP TABLE IF EXISTS `book_student`;
CREATE TABLE `book_student`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` int(11) UNSIGNED NOT NULL,
  `student_id` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `book_id`(`book_id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  CONSTRAINT `book_student_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_student_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 113 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_student
-- ----------------------------
INSERT INTO `book_student` VALUES (84, 23, 51, NULL, NULL);
INSERT INTO `book_student` VALUES (85, 24, 51, NULL, NULL);
INSERT INTO `book_student` VALUES (86, 29, 59, NULL, NULL);
INSERT INTO `book_student` VALUES (87, 28, 59, NULL, NULL);
INSERT INTO `book_student` VALUES (88, 27, 59, NULL, NULL);
INSERT INTO `book_student` VALUES (89, 30, 74, NULL, NULL);
INSERT INTO `book_student` VALUES (90, 28, 74, NULL, NULL);
INSERT INTO `book_student` VALUES (91, 25, 74, NULL, NULL);
INSERT INTO `book_student` VALUES (92, 35, 100, NULL, NULL);
INSERT INTO `book_student` VALUES (93, 33, 100, NULL, NULL);
INSERT INTO `book_student` VALUES (95, 25, 95, NULL, NULL);
INSERT INTO `book_student` VALUES (96, 30, 95, NULL, NULL);
INSERT INTO `book_student` VALUES (97, 40, 95, NULL, NULL);
INSERT INTO `book_student` VALUES (98, 24, 81, NULL, NULL);
INSERT INTO `book_student` VALUES (99, 34, 81, NULL, NULL);
INSERT INTO `book_student` VALUES (100, 31, 81, NULL, NULL);
INSERT INTO `book_student` VALUES (101, 33, 100, NULL, NULL);
INSERT INTO `book_student` VALUES (102, 27, 100, NULL, NULL);
INSERT INTO `book_student` VALUES (103, 23, 100, NULL, NULL);
INSERT INTO `book_student` VALUES (105, 26, 54, NULL, NULL);
INSERT INTO `book_student` VALUES (106, 40, 63, NULL, NULL);
INSERT INTO `book_student` VALUES (107, 22, 54, NULL, NULL);
INSERT INTO `book_student` VALUES (108, 25, 55, NULL, NULL);
INSERT INTO `book_student` VALUES (109, 30, 55, NULL, NULL);
INSERT INTO `book_student` VALUES (110, 31, 55, NULL, NULL);
INSERT INTO `book_student` VALUES (111, 34, 55, NULL, NULL);
INSERT INTO `book_student` VALUES (112, 40, 55, NULL, NULL);

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (21, 'corrupti', 'Anya Hermann', 2005, 8, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (22, 'et', 'Vergie Nikolaus', 2020, 22, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (23, 'accusantium', 'Kyra Okuneva', 1993, 11, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (24, 'reprehenderit', 'Darrell Mohr', 1982, 17, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (25, 'ullam', 'Theodore Powlowski', 1971, 16, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (26, 'cupiditate', 'Lesley Pollich', 2012, 4, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (27, 'in', 'Gilbert Wiza', 2008, 3, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (28, 'facilis', 'Ignacio Gutmann', 1983, 5, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (29, 'autem', 'Felipa Robel Jr.', 2003, 21, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (30, 'voluptatem', 'Mr. Vincent Olson III', 1973, 22, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (31, 'est', 'Maximillia Brekke Jr.', 1989, 24, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (32, 'enim', 'Xander Boyer II', 2013, 0, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (33, 'consequatur', 'Reid Spencer', 1985, 5, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (34, 'velit', 'Meghan Boehm', 1984, 21, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (35, 'quam', 'Miss Alda Schamberger MD', 1991, 21, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (36, 'nihil', 'Prof. Josue Mraz MD', 2012, 0, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (37, 'recusandae', 'Gayle Jaskolski', 1983, 22, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (38, 'distinctio', 'Janet Stanton DVM', 2000, 21, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (39, 'voluptatum', 'Dr. Daija Braun PhD', 1997, 20, '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `books` VALUES (40, 'qui', 'Calista Dach', 2021, 18, '2022-07-08 07:39:01', '2022-07-08 07:39:01');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (29, '2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (30, '2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES (31, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (32, '2019_12_14_000001_create_personal_access_tokens_table', 1);
INSERT INTO `migrations` VALUES (33, '2022_07_07_083434_create_books_table', 1);
INSERT INTO `migrations` VALUES (34, '2022_07_07_083939_create_students_table', 1);
INSERT INTO `migrations` VALUES (35, '2022_07_07_084656_create_book_student_table', 1);

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token`) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (51, 'hahn.garnett', 'Alvah Kerluke', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (52, 'wrenner', 'Gideon Schowalter III', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (53, 'kody42', 'Prof. Vance Berge', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (54, 'jbeer', 'Treva Oberbrunner PhD', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (55, 'amber13', 'Mr. Stevie West V', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (56, 'maybelle35', 'Marvin Ratke', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (57, 'rico88', 'Joshuah Shields', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (58, 'abraham.hills', 'Onie Bauch', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (59, 'ariel85', 'Ron Walter', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (60, 'emerson.daniel', 'Dr. Augusta Ritchie', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (61, 'earnestine.russel', 'Dr. Ahmed Bogan', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (62, 'ykutch', 'Lenna O\'Reilly', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (63, 'keagan.cassin', 'Edwina Haley DVM', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (64, 'schmeler.edward', 'Justyn Bernhard', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (65, 'reuben85', 'Prof. Cade DuBuque DDS', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (66, 'franecki.kayden', 'Wyatt Nitzsche', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (67, 'nayeli.wuckert', 'Manuel Berge', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (68, 'lizzie.langosh', 'Annetta Kuphal III', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (69, 'stanton.karlie', 'Ms. Ollie Hegmann I', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (70, 'hilma17', 'Reyna Mohr', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (71, 'ccartwright', 'Domenica Zieme Sr.', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (72, 'qprice', 'Jennie Zboncak', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (73, 'deckow.lorine', 'Amber Walsh', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (74, 'kevin.schimmel', 'Prof. Hailey McLaughlin DDS', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (75, 'nelson03', 'Josie Schulist', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (76, 'goodwin.pansy', 'Rae Reynolds', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (77, 'larry.bayer', 'Elissa Gutkowski V', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (78, 'jmaggio', 'Darian Strosin', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (79, 'sgislason', 'Dr. Emerald Tromp Sr.', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (80, 'ozella.franecki', 'Miss Viva Douglas IV', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (81, 'meaghan57', 'Ms. Cheyenne Maggio I', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (82, 'dibbert.neha', 'Adele Orn', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (83, 'vtillman', 'Raegan Bosco', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (84, 'vabernathy', 'Kyla Bernier', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (85, 'hermann.kyla', 'Janis Mills DVM', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (86, 'dusty07', 'Mrs. Kristin Feil', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (87, 'tianna.hagenes', 'Abby Heller', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (88, 'tremblay.annabelle', 'Ethan Cruickshank', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (89, 'theo.tromp', 'Jannie Ratke', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (90, 'oscar70', 'Mckayla Klein', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (91, 'langosh.khalil', 'June Kozey', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (92, 'sid.balistreri', 'Lyric Krajcik', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (93, 'frieda09', 'Harrison Lemke', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (94, 'lloyd.pollich', 'Josiane Herzog MD', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (95, 'kunde.cassandra', 'Elian Friesen', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (96, 'erling62', 'Prof. Reyna Walker', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (97, 'guy.armstrong', 'Ola Mayer', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (98, 'hyatt.dewayne', 'Emelie Lehner', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (99, 'toni85', 'Theresa Wisoky', '2022-07-08 07:39:01', '2022-07-08 07:39:01');
INSERT INTO `students` VALUES (100, 'marvin.camila', 'Larry Ankunding', '2022-07-08 07:39:01', '2022-07-08 07:39:01');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp(0) NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
