/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.14-MariaDB : Database - db_links
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_links` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `db_links`;

/*Table structure for table `biblioteca` */

DROP TABLE IF EXISTS `biblioteca`;

CREATE TABLE `biblioteca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autor_titulo_anio` varchar(250) NOT NULL,
  `cant` int(3) NOT NULL,
  `cantpag` varchar(250) NOT NULL,
  `editorial` varchar(250) DEFAULT NULL,
  `precio_compra` varchar(10) DEFAULT NULL,
  `precio_venta` varchar(10) DEFAULT NULL,
  `fk_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `biblioteca_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

/*Data for the table `biblioteca` */

insert  into `biblioteca`(`id`,`autor_titulo_anio`,`cant`,`cantpag`,`editorial`,`precio_compra`,`precio_venta`,`fk_user`) values (46,'JavaScript - Biblia de JavaScript (Gold Edition)',15,'120','JavaScript','150 $','190 $',21);

/*Table structure for table `buscador` */

DROP TABLE IF EXISTS `buscador`;

CREATE TABLE `buscador` (
  `codigo` int(11) NOT NULL,
  `fk_prestar` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  PRIMARY KEY (`codigo`,`fk_prestar`,`fk_user`),
  KEY `fk_biblioteca` (`fk_prestar`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `buscador_ibfk_2` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `buscador` */

/*Table structure for table `mobiliario` */

DROP TABLE IF EXISTS `mobiliario`;

CREATE TABLE `mobiliario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) NOT NULL,
  `sala` varchar(250) NOT NULL,
  `cant` int(2) NOT NULL,
  `fk_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `mobiliario_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

/*Data for the table `mobiliario` */

insert  into `mobiliario`(`id`,`descripcion`,`sala`,`cant`,`fk_user`) values (33,'Computadora ','Sala de Informatica',15,21);

/*Table structure for table `prestar` */

DROP TABLE IF EXISTS `prestar`;

CREATE TABLE `prestar` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `nombre_libro` varchar(250) NOT NULL,
  `cant` int(11) NOT NULL,
  `autor` varchar(250) NOT NULL,
  `editorial` varchar(250) NOT NULL,
  `fecha` date NOT NULL,
  `fk_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_editorial` (`editorial`),
  KEY `fk_autor` (`autor`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `prestar_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

/*Data for the table `prestar` */

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`) values ('fGnnLbHAJD2Y2nCnjoSzyS8TZc8xPdVl',1637850414,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\",\"Missing credentials\",\"Missing credentials\"]},\"passport\":{}}');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(200) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`fullname`,`username`,`password`) values (21,'Mariano','mariano','$2a$10$Z4hS2pSfD49kCa/UFLF7Pe9bQtkF17RhsvdqE95N70wJN63z1YW.C');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
