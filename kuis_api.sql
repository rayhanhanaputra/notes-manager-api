-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2024 at 04:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kuis_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `userId`) VALUES
(2, 'string', 'string', '2024-02-04 03:10:02', '2024-02-04 03:28:35', 2);

-- --------------------------------------------------------

--
-- Table structure for table `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refreshtokens`
--

INSERT INTO `refreshtokens` (`id`, `token`, `expiryDate`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'd5d7cbac-42d2-4fc0-b957-3a353ff45a1c', '2024-02-05 03:02:59', '2024-02-04 03:02:59', '2024-02-04 03:02:59', 1),
(2, 'fc165d62-c2e0-4bbe-a25d-26377d33ebb8', '2024-02-05 03:06:22', '2024-02-04 03:06:22', '2024-02-04 03:06:22', 2),
(3, 'c63dfe66-22d6-4dd2-be51-c1ce458b669b', '2024-02-05 03:08:45', '2024-02-04 03:08:45', '2024-02-04 03:08:45', 2),
(4, '89816cb5-3bc3-4837-9b5b-29c0eb88a3b9', '2024-02-05 03:09:45', '2024-02-04 03:09:45', '2024-02-04 03:09:45', 2),
(5, '612dbf9f-6b68-402d-8675-b928e09f47da', '2024-02-05 03:11:10', '2024-02-04 03:11:10', '2024-02-04 03:11:10', 2),
(6, 'bc898e15-2f68-43cb-86a5-fa77a300015b', '2024-02-05 03:12:53', '2024-02-04 03:12:53', '2024-02-04 03:12:53', 2),
(7, '6046ee37-23b0-4489-8061-88087cd50029', '2024-02-05 03:16:45', '2024-02-04 03:16:45', '2024-02-04 03:16:45', 2),
(8, 'b9ea8201-e8ab-4577-874a-176f2ae1a83c', '2024-02-05 03:17:15', '2024-02-04 03:17:15', '2024-02-04 03:17:15', 2),
(9, '8b082e59-60ee-45df-bd65-513652299293', '2024-02-05 03:18:19', '2024-02-04 03:18:19', '2024-02-04 03:18:19', 2),
(10, '76207ab5-839a-4ed4-b5ab-2ff7ba24282e', '2024-02-05 03:19:15', '2024-02-04 03:19:15', '2024-02-04 03:19:15', 2),
(11, 'cef92f60-2309-4458-96c4-ebe550821604', '2024-02-05 03:20:08', '2024-02-04 03:20:08', '2024-02-04 03:20:08', 2),
(12, '6b18ca60-b017-455a-a663-038b8ab996ef', '2024-02-05 03:20:49', '2024-02-04 03:20:49', '2024-02-04 03:20:49', 2),
(13, '984e813e-5a41-4c48-8229-db32fb34c8cc', '2024-02-05 03:22:02', '2024-02-04 03:22:02', '2024-02-04 03:22:02', 2),
(14, '376c26d5-d733-4743-8fc1-29048a7c8d0a', '2024-02-05 03:22:57', '2024-02-04 03:22:57', '2024-02-04 03:22:57', 2),
(15, '746c8c25-80fa-403f-8f8b-f4c7b1f18e9b', '2024-02-05 03:28:17', '2024-02-04 03:28:17', '2024-02-04 03:28:17', 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2024-02-04 03:02:30', '2024-02-04 03:02:30'),
(2, 'user', '2024-02-04 03:02:30', '2024-02-04 03:02:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'rayhan', 'john@example.com', '$2a$08$/4eCWDLixUMbUnbP9Q8dFu5HzD74nlCo8Vl9elPKn2mBYjBrrUE6m', '2024-02-04 03:02:49', '2024-02-04 03:02:49'),
(2, 'john_doe', 'joh1n@example.com', '$2a$08$K/REHyUlwF0bQOAbo1WvoOaasHh2N4MG0w44bseFyFINgI1PsrXOK', '2024-02-04 03:06:17', '2024-02-04 03:06:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2024-02-04 03:02:49', '2024-02-04 03:02:49', 2, 1),
('2024-02-04 03:06:17', '2024-02-04 03:06:17', 2, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
