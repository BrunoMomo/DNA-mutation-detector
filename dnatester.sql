-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-08-2021 a las 03:29:25
-- Versión del servidor: 5.6.20
-- Versión de PHP: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `dnatester`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dnacom`
--

CREATE TABLE IF NOT EXISTS `dnacom` (
`id_dnacom` int(11) NOT NULL,
  `dnacom_dna` longtext COLLATE latin1_bin NOT NULL,
  `dnacom_id_dnaref` int(11) NOT NULL,
  `dnacom_hmutation` tinyint(1) NOT NULL,
  `dnacom_datetimereg` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_bin AUTO_INCREMENT=62 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dnaref`
--

CREATE TABLE IF NOT EXISTS `dnaref` (
`id_dnaref` int(11) NOT NULL,
  `dnaref_dnaref` varchar(512) COLLATE latin1_bin NOT NULL,
  `dnaref_datetimereg` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_bin AUTO_INCREMENT=32 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dnacom`
--
ALTER TABLE `dnacom`
 ADD PRIMARY KEY (`id_dnacom`);

--
-- Indices de la tabla `dnaref`
--
ALTER TABLE `dnaref`
 ADD PRIMARY KEY (`id_dnaref`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dnacom`
--
ALTER TABLE `dnacom`
MODIFY `id_dnacom` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT de la tabla `dnaref`
--
ALTER TABLE `dnaref`
MODIFY `id_dnaref` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
