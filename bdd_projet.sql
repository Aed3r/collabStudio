-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 09:57 PM
-- Server version: 10.3.27-MariaDB-0+deb10u1
-- PHP Version: 7.3.27-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `am04482t`
--

DROP TABLE IF EXISTS `sons`;
DROP TABLE IF EXISTS `instru_son`;
DROP TABLE IF EXISTS `Instrument`;
DROP TABLE IF EXISTS `musique_sons`;
DROP TABLE IF EXISTS `musique`;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `expediteur_id` int(11) DEFAULT NULL,
  `destinataire_id` int(11) DEFAULT NULL,
  `texte` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `musique`
--
;
CREATE TABLE `musique` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `titre` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `track` varchar(50000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `musique_sons`
--
DROP TABLE IF EXISTS `musique_sons`;
CREATE TABLE `musique_sons` (
  `musique_id` int(11) NOT NULL,
  `son_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sons`
--
CREATE TABLE `sons` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `son` varchar(500),
  `nom` varchar(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Utilisateurs`
--
DROP TABLE IF EXISTS `Utilisateurs`;
CREATE TABLE `Utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `pseudo` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nom` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prenom` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mot_de_passe` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `userProjects`;
create table `userProjets` (
  `projectID` int(11) NOT NULL, 
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `userProjects`
  ADD PRIMARY KEY (`projectID`, `userID`),
  ADD CONSTRAINT `projets` FOREIGN KEY (`projectID`) REFERENCES `musique` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `utilisateurs` FOREIGN KEY (`userID`) REFERENCES `Utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD KEY `expediteur_idx` (`expediteur_id`),
  ADD KEY `destinataire_idx` (`destinataire_id`);

--
-- Indexes for table `musique`
--

--
-- Indexes for table `musique_sons`
--
ALTER TABLE `musique_sons`
  ADD PRIMARY KEY (`musique_id`,`son_id`);

--
-- Indexes for table `sons`
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `destinataire` FOREIGN KEY (`destinataire_id`) REFERENCES `Utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `expediteur` FOREIGN KEY (`expediteur_id`) REFERENCES `Utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `musique`
--
ALTER TABLE `musique`
  ADD CONSTRAINT `fk_musique_1` FOREIGN KEY (`uid`) REFERENCES `Utilisateurs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `musique_sons`
--
ALTER TABLE `musique_sons`
  ADD CONSTRAINT `musique` FOREIGN KEY (`musique_id`) REFERENCES `musique` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sons`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
