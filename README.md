# CW_FootballStats
Course work for IT STEP based on Angular 15, ASP.NET Core 3.1, MSSQL Server

In ClientApp folder you need to import node_modules that angular project should work fine.

This is code based on method "DatabaseFirst", if you want to test it 
how it works you need to create database first. 
Code for creating database (sql query):

USE [master]
GO
/****** Object:  Database [EkzamenFootball]    Script Date: 12/13/2022 11:26:36 AM ******/
CREATE DATABASE [EkzamenFootball]
GO
USE [EkzamenFootball]
GO
CREATE TABLE [dbo].[Cards](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MatchId] [int] NULL,
	[PlayerId] [int] NULL,
	[CardName] [nvarchar](max) NULL
)
GO
/****** Object:  Table [dbo].[Goals]    Script Date: 12/13/2022 11:26:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Goals](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MatchId] [int] NULL,
	[PlayerId] [int] NULL,
	[GoalMinute] [int] NULL
) 
GO
/****** Object:  Table [dbo].[Kalendar]    Script Date: 12/13/2022 11:26:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Kalendar](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MatchId] [int] NULL,
	[PlayDate] [datetime] NULL
) 
GO
/****** Object:  Table [dbo].[Match]    Script Date: 12/13/2022 11:26:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Match](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Team1Id] [int] NULL,
	[Team2Id] [int] NULL,
	[TeamWinId] [int] NULL,
	[Team1Score] [int] NULL,
	[Team2Score] [int] NULL,
	[TeamHomeId] [int] NULL
) 
GO
/****** Object:  Table [dbo].[Player]    Script Date: 12/13/2022 11:26:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Player](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Photo] [nvarchar](max) NULL,
	[TeamId] [int] NULL,
	)
GO
/****** Object:  Table [dbo].[Team]    Script Date: 12/13/2022 11:26:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeamName] [nvarchar](max) NULL,
	[Herb] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[HomeStadion] [nvarchar](max) NULL,
	[TrenerId] [int] NULL,
	)
GO
/****** Object:  Table [dbo].[Trener]    Script Date: 12/13/2022 11:26:36 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trener](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
)
GO
USE [master]
GO
ALTER DATABASE [EkzamenFootball] SET  READ_WRITE 
GO



