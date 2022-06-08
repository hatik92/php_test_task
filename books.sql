/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : books

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 08/06/2022 20:09:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `year` int NULL DEFAULT NULL,
  `available` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (1, 'book1', 'author1', 1987, 15);
INSERT INTO `books` VALUES (2, 'book2', 'author2', 1999, 15);
INSERT INTO `books` VALUES (3, 'book3', 'author3', 1999, 15);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for users_books
-- ----------------------------
DROP TABLE IF EXISTS `users_books`;
CREATE TABLE `users_books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `book_id`(`book_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `users_books_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_books_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_books
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
