/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80018
Source Host           : localhost:3306
Source Database       : club_database

Target Server Type    : MYSQL
Target Server Version : 80018
File Encoding         : 65001

Date: 2023-02-26 17:24:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动名称',
  `content` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动内容',
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动图片',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `organization_id` int(11) NOT NULL COMMENT '举办部门',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `activityObj` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '活动对象、招新对象',
  `timeStart` datetime(6) DEFAULT NULL COMMENT '活动开始时间',
  `timeEnd` datetime(6) DEFAULT NULL COMMENT '活动结束时间',
  `host` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '举办方',
  `activityPlace` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '活动地点',
  `enrollTime` datetime DEFAULT NULL,
  `activityObjtext` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '招新对象内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('37', '养生不是躺平，身体才是革命的本钱', '<p>社团日常就是跳养生操、广场舞</p><p>根据成员体质定制“营养食谱”</p><p>还会一起制作“养生版奶茶”</p><p>修身养性，快乐翻倍！</p>', '1677289677093.png', null, '57', '2023-02-25 09:48:01', '招新对象', '2023-03-01 00:00:00.000000', '2023-03-10 00:00:00.000000', '养生社', '篮球场', null, '大一全体新生');
INSERT INTO `activity` VALUES ('38', '“放飞自我，共铸养生”', '<p><span style=\"color: rgb(51, 51, 51);\">在本次活动中，我社分享中医养生知识，为大家发放香囊，香囊以药物之味，经口鼻吸入，使经脉大通，祛邪扶正，以达到祛病强身之功效！</span>	<span style=\"color: rgb(51, 51, 51);\">感受传统文化的博大精深，感受中医的奥妙之处。</span></p>', '1677290360084.png', null, '57', '2023-02-25 09:59:27', '活动对象', '2023-04-04 00:00:00.000000', '2023-04-05 00:00:00.000000', '养生社', '一教2203', null, '全体师生');

-- ----------------------------
-- Table structure for affiche_info
-- ----------------------------
DROP TABLE IF EXISTS `affiche_info`;
CREATE TABLE `affiche_info` (
  `afficheId` int(11) NOT NULL AUTO_INCREMENT,
  `afficheTheme` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '公告主题',
  `afficheTime` datetime DEFAULT NULL COMMENT '时间',
  `affichePlace` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地点',
  `afficheContent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '内容',
  `announceTime` datetime DEFAULT NULL COMMENT '发布时间',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图片',
  `organization_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`afficheId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of affiche_info
-- ----------------------------
INSERT INTO `affiche_info` VALUES ('6', '学习新思想，争做新青年', '2023-02-23 22:36:47', '报告厅', '<p><span style=\"color: rgb(0, 0, 0);\">新时代学习新思想，新征程呼唤新担当。</span></p>', null, '1677162984346.png', '0');
INSERT INTO `affiche_info` VALUES ('8', '篮球社招新啦！', '2023-03-10 00:00:00', '一教公告栏', '<p>为丰富我院学生的课余生活，促进大家身心健康发展，响应阳光体育运动，同时给予同学一个学习篮球交流技术的平台。欢迎<strong>大一大二</strong>热爱篮球运动的同学加入我们！！！</p>', null, '1677256667854.png', '61');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `addtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `faculty` int(11) DEFAULT NULL,
  `major` int(11) DEFAULT NULL,
  `class_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`class_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('2', '2023-02-15 14:59:18', '13', '20', '好好学习');
INSERT INTO `class` VALUES ('3', '2023-02-15 14:59:42', '13', '20', '天天向上');
INSERT INTO `class` VALUES ('4', '2023-02-15 15:00:23', '14', '27', '无限超越1班');
INSERT INTO `class` VALUES ('5', '2023-02-15 15:01:16', '14', '31', '无限超越2班');
INSERT INTO `class` VALUES ('8', '2023-02-15 15:03:36', '15', '33', '终极1班');
INSERT INTO `class` VALUES ('9', '2023-02-15 15:03:52', '15', '34', '六六大顺');
INSERT INTO `class` VALUES ('10', '2023-02-15 15:04:31', '16', '38', '6666');
INSERT INTO `class` VALUES ('11', '2023-02-15 15:04:59', '20', '61', '不知道叫什么');
INSERT INTO `class` VALUES ('12', '2023-02-16 19:57:23', '13', '24', '飞天小女警');
INSERT INTO `class` VALUES ('13', '2023-02-16 19:58:11', '16', '40', '天下我有');
INSERT INTO `class` VALUES ('14', '2023-02-16 19:58:47', '14', '30', '大太阳');
INSERT INTO `class` VALUES ('16', '2023-02-16 19:59:26', '15', '37', '哈哈哈哈哈哈');
INSERT INTO `class` VALUES ('17', '2023-02-16 20:00:04', '14', '26', '冰糖葫芦');
INSERT INTO `class` VALUES ('18', '2023-02-16 20:00:17', '14', '28', '烤红薯');
INSERT INTO `class` VALUES ('19', '2023-02-16 20:00:53', '14', '29', '北京烤鸭');
INSERT INTO `class` VALUES ('20', '2023-02-16 20:01:46', '15', '34', '重庆酸辣粉');
INSERT INTO `class` VALUES ('21', '2023-02-16 20:02:08', '16', '41', '麻辣烫');
INSERT INTO `class` VALUES ('22', '2023-02-16 20:02:28', '16', '39', '武汉热干面');

-- ----------------------------
-- Table structure for club_type
-- ----------------------------
DROP TABLE IF EXISTS `club_type`;
CREATE TABLE `club_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of club_type
-- ----------------------------
INSERT INTO `club_type` VALUES ('10', '志愿服务型');
INSERT INTO `club_type` VALUES ('13', '文化体育型');
INSERT INTO `club_type` VALUES ('14', '艺术表演型');
INSERT INTO `club_type` VALUES ('15', '应用实践型');
INSERT INTO `club_type` VALUES ('18', '兴趣娱乐型');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '内容',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发布用户头像',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户昵称',
  `user_id` bigint(11) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', null, '2023-02-25 00:07:00', '<p>客官请留步</p>', '1677249457761.jpg', '伍六七', '30');
INSERT INTO `comment` VALUES ('2', null, '2023-02-25 16:12:13', '<p>天天开心！</p>', '1677211820487.jpg', '艾斯', '29');
INSERT INTO `comment` VALUES ('3', null, '2023-02-26 14:52:34', '<p>论文赶紧完成！</p>', '1677211446715.jpg', 'LXX', '25');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `department_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '院系名称',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`department_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('13', '信息与工程学院', '2023-02-14 18:48:30');
INSERT INTO `department` VALUES ('14', '传媒与艺术设计学院', '2023-02-14 18:56:28');
INSERT INTO `department` VALUES ('15', '经济学院', '2023-02-14 19:01:27');
INSERT INTO `department` VALUES ('16', '管理学院', '2023-02-14 19:01:36');
INSERT INTO `department` VALUES ('20', '语言文化学院', '2023-02-15 00:08:45');

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `major_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `major_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '专业名称',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `faculty` int(11) DEFAULT NULL COMMENT '院系 id',
  PRIMARY KEY (`major_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of major
-- ----------------------------
INSERT INTO `major` VALUES ('20', '软件工程', '2023-02-14 20:39:34', '13');
INSERT INTO `major` VALUES ('22', '计算机与科学', '2023-02-14 20:42:38', '13');
INSERT INTO `major` VALUES ('24', '电子信息工程', '2023-02-14 20:44:00', '13');
INSERT INTO `major` VALUES ('25', '数据科学与大数据技术', '2023-02-14 20:44:21', '13');
INSERT INTO `major` VALUES ('26', '播音与主持艺术', '2023-02-14 20:44:33', '14');
INSERT INTO `major` VALUES ('27', '摄影', '2023-02-14 20:44:47', '14');
INSERT INTO `major` VALUES ('28', '广播电视编导', '2023-02-14 20:45:11', '14');
INSERT INTO `major` VALUES ('29', '环境设计', '2023-02-14 20:45:24', '14');
INSERT INTO `major` VALUES ('30', '视觉传达设计', '2023-02-14 20:45:36', '14');
INSERT INTO `major` VALUES ('31', '风景园林', '2023-02-14 20:45:46', '14');
INSERT INTO `major` VALUES ('32', '产品设计', '2023-02-14 20:45:54', '14');
INSERT INTO `major` VALUES ('33', '金融学', '2023-02-14 20:46:06', '15');
INSERT INTO `major` VALUES ('34', '国际经济与贸易', '2023-02-14 20:46:37', '15');
INSERT INTO `major` VALUES ('35', '电子商务', '2023-02-14 20:46:46', '15');
INSERT INTO `major` VALUES ('36', '法学', '2023-02-14 20:46:58', '15');
INSERT INTO `major` VALUES ('37', '会计学', '2023-02-14 20:47:11', '16');
INSERT INTO `major` VALUES ('38', '旅游管理', '2023-02-14 20:47:22', '16');
INSERT INTO `major` VALUES ('39', '人力资源管理', '2023-02-14 20:47:31', '16');
INSERT INTO `major` VALUES ('40', '市场营销学', '2023-02-14 20:47:45', '16');
INSERT INTO `major` VALUES ('41', '财务管理', '2023-02-14 20:47:57', '16');
INSERT INTO `major` VALUES ('61', '汉语言文学', '2023-02-15 00:10:22', '20');
INSERT INTO `major` VALUES ('62', '英语', '2023-02-15 11:07:55', '20');

-- ----------------------------
-- Table structure for member_info
-- ----------------------------
DROP TABLE IF EXISTS `member_info`;
CREATE TABLE `member_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL COMMENT '社团 id',
  `joinTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member_info
-- ----------------------------
INSERT INTO `member_info` VALUES ('39', '16', '30', '57', '2023-02-25 22:40:18');
INSERT INTO `member_info` VALUES ('40', '19', '31', '57', '2023-02-25 22:47:06');
INSERT INTO `member_info` VALUES ('41', '17', '26', '57', '2023-02-26 15:57:55');

-- ----------------------------
-- Table structure for organization
-- ----------------------------
DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `organization_id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '社团名称',
  `department_id` int(11) NOT NULL COMMENT '所属院系',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '社团旗帜',
  `people_num` int(11) DEFAULT '0' COMMENT '社团成员人数',
  `introduction` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '介绍',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '成立时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL COMMENT '社团管理员id/会长',
  `tenet` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '社团宗旨',
  `synopsis` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '社团简介',
  `brandName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '品牌活动名称',
  `brandContent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '品牌活动内容',
  `associType` int(11) DEFAULT NULL COMMENT '社团类型',
  `vip_num` int(11) DEFAULT NULL COMMENT '社团会员人数',
  `status` int(11) DEFAULT '0' COMMENT '0: 审核中 1: 审核通过 2: 审核不通过',
  PRIMARY KEY (`organization_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of organization
-- ----------------------------
INSERT INTO `organization` VALUES ('53', '羽毛球俱乐部', '13', '1677165105919.png', '0', '<p><span style=\"color: rgb(51, 51, 51);\">让各位羽毛球爱好者能够有组织有目的的训练,促进羽毛球爱好者之间的交流,同时提高羽毛球爱好者的综合素质和社团的体育水平,从而推动校园精神文明建设。</span></p>', '2023-02-23 23:13:54', '2023-02-24 12:04:50', '25', '每天运动一小时，完美身材你我有！', null, 'undefined', 'undefined', '13', null, '1');
INSERT INTO `organization` VALUES ('54', '舞动奇迹', '14', '1677212128697.png', '0', '<p><span style=\"color: rgb(51, 51, 51);\">无论是什么时候,我都不想错过任何机会,更不希望你错过</span>舞动奇迹<span style=\"color: rgb(51, 51, 51);\">,因为你是我的最爱!</span></p>', '2023-02-24 12:16:49', '2023-02-24 12:17:01', '26', '你爱跳舞吗？', null, 'undefined', 'undefined', '14', null, '1');
INSERT INTO `organization` VALUES ('55', '相声社', '14', '1677212406833.png', '0', '<p>	以传承传统文化为目标</p><p>	<strong style=\"color: rgb(51, 51, 51);\">包教包会</strong></p><p><br></p>', '2023-02-24 12:21:18', '2023-02-24 12:48:37', '27', '包你“说、学、逗、唱”样样齐', null, 'undefined', 'undefined', '10', null, '1');
INSERT INTO `organization` VALUES ('56', '漫画社', '15', '1677212702513.png', '0', '<p><strong style=\"color: rgb(247, 49, 49);\">禀着健康积极向上的原则,丰富校园文化生活</strong></p><p>以创作、推广动漫画、美术,提高会员创作能 力和鉴赏能力,丰富校园文化,促进大学生全面健康成长<span style=\"color: rgb(51, 51, 51);\">,进一步提高综合素质。</span></p><p><span style=\"color: rgb(51, 51, 51);\"><span class=\"ql-cursor\">﻿</span></span><img src=\"http://localhost:3000/images/1677212817074.png\"></p>', '2023-02-24 12:27:04', '2023-02-24 12:27:10', '28', '今日风喧嚣,也有风向标,疾风飓风皆浮云,二次元才是王道。', null, 'undefined', 'undefined', '18', null, '1');
INSERT INTO `organization` VALUES ('57', '养生社', '20', '1677212908417.png', '0', '<p><strong style=\"color: rgb(51, 51, 51);\">养生就是指通过各种方法颐养生命、增强体质、预防疾病，从而达到延年益寿的一种医事活动。</strong></p><p><span style=\"color: rgb(51, 51, 51);\">所谓生，就是生命、生存、生长之意；所谓养，即保养、调养、补养之意。总之，养生就是保养生命的意思。以传统中医理论为指导，遵循阴阳五行生化收藏之变化规律，对人体进行科学调养，保持生命健康活力。</span></p>', '2023-02-24 12:31:00', '2023-02-24 12:31:14', '29', '身体是革命的本钱', null, 'undefined', 'undefined', '18', null, '1');
INSERT INTO `organization` VALUES ('58', '早起社', '13', '1677213196287.png', '0', '<p>但是在一次次“重启”失败的背后</p><p>我们错过的是早晨的阳光、新鲜的空气</p><p>&nbsp;正所谓“一日之计在于晨”</p><p>为了能够更好地抓住“黄金时刻”</p><p>加入我们吧</p><p>让你——“起床困难户”爱上早起</p>', '2023-02-24 12:34:14', '2023-02-25 09:14:13', '25', '“熬夜一时爽，早起悔断肠”', null, 'undefined', 'undefined', '15', null, '1');
INSERT INTO `organization` VALUES ('59', '我和我的饭搭子们', '13', '1677213932589.png', '0', '<p>	社团的日常就是“吃！吃！吃！”</p><p>	火锅、烧烤、麻辣烫、烤肉全都有</p><p>	为组织提供美食“线索”为第一要义</p><p>	全勤参加组织每次会议（聚餐）为首要任务</p><p>	这不是吃货的天堂是什么？</p>', '2023-02-24 12:46:31', '2023-02-24 12:46:36', '28', '“民以食为天”', null, 'undefined', 'undefined', '18', null, '1');
INSERT INTO `organization` VALUES ('62', '篮球社', '15', '1677395436163.png', '0', '打篮球~', '2023-02-26 15:11:03', '2023-02-26 15:12:17', '30', '锻炼身体', null, 'undefined', 'undefined', '13', null, '2');
INSERT INTO `organization` VALUES ('63', '读书社', '20', '1677398812160.jpg', '0', '12123', '2023-02-26 16:07:08', null, '31', '12123', null, 'undefined', 'undefined', '18', null, '0');

-- ----------------------------
-- Table structure for org_info
-- ----------------------------
DROP TABLE IF EXISTS `org_info`;
CREATE TABLE `org_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL COMMENT '社团 id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of org_info
-- ----------------------------
INSERT INTO `org_info` VALUES ('58', '26', '54');
INSERT INTO `org_info` VALUES ('59', '27', '55');
INSERT INTO `org_info` VALUES ('60', '28', '56');
INSERT INTO `org_info` VALUES ('61', '29', '57');
INSERT INTO `org_info` VALUES ('62', '25', '58');
INSERT INTO `org_info` VALUES ('63', '28', '59');
INSERT INTO `org_info` VALUES ('66', '25', '57');
INSERT INTO `org_info` VALUES ('68', '28', '56');
INSERT INTO `org_info` VALUES ('70', '30', '62');

-- ----------------------------
-- Table structure for quit_association
-- ----------------------------
DROP TABLE IF EXISTS `quit_association`;
CREATE TABLE `quit_association` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `applyTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `organization_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quit_association
-- ----------------------------
INSERT INTO `quit_association` VALUES ('13', '31', '身体倍儿好了 不想卷了', '2023-02-26 16:08:15', '57', '2');

-- ----------------------------
-- Table structure for sector_info
-- ----------------------------
DROP TABLE IF EXISTS `sector_info`;
CREATE TABLE `sector_info` (
  `sec_id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL COMMENT '社团 id',
  `sector_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门名称',
  `sector_duty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门职责',
  PRIMARY KEY (`sec_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sector_info
-- ----------------------------
INSERT INTO `sector_info` VALUES ('16', '57', '财务部', '收钱发钱');

-- ----------------------------
-- Table structure for stuposition
-- ----------------------------
DROP TABLE IF EXISTS `stuposition`;
CREATE TABLE `stuposition` (
  `posi_id` int(11) NOT NULL AUTO_INCREMENT,
  `addtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `stu_position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`posi_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stuposition
-- ----------------------------
INSERT INTO `stuposition` VALUES ('16', '2023-02-16 20:29:44', '会长');
INSERT INTO `stuposition` VALUES ('17', '2023-02-16 20:29:56', '副会长');
INSERT INTO `stuposition` VALUES ('18', '2023-02-16 20:30:06', '干事');
INSERT INTO `stuposition` VALUES ('19', '2023-02-16 20:30:44', '普通用户');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号',
  `phone` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '1637597338099.jpg' COMMENT '头像',
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '性别',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stuFaculty` int(11) DEFAULT NULL COMMENT '学院',
  `stuMajor` int(11) DEFAULT NULL COMMENT '专业',
  `stuClass` int(11) DEFAULT NULL COMMENT '班级',
  `stuId` bigint(11) NOT NULL COMMENT '学号',
  PRIMARY KEY (`user_id`,`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('24', 'admin', '37756bd3cff2f04c82a0af2554a49b54', '系统管理员', '', '1677204327048.jpg', '女', '2023-02-24 10:05:58', '2023-02-24 10:01:09', '13', '20', '2', '0');
INSERT INTO `users` VALUES ('25', '小廖', '37756bd3cff2f04c82a0af2554a49b54', 'LXX', '13900000000', '1677211446715.jpg', '女', '2023-02-24 12:04:30', '2023-02-24 10:09:40', '13', '20', '3', '20190000');
INSERT INTO `users` VALUES ('26', '小何', '37756bd3cff2f04c82a0af2554a49b54', '小何', '13499999999', '1677211615144.jpg', '女', '2023-02-24 12:06:56', '2023-02-24 12:06:17', '14', '31', '5', '20190001');
INSERT INTO `users` VALUES ('27', '碓氷拓海', '37756bd3cff2f04c82a0af2554a49b54', '碓氷拓海', '15500001111', '1677211695770.jpg', '男', '2023-02-24 12:08:19', '2023-02-24 12:07:23', '15', '33', '8', '20190002');
INSERT INTO `users` VALUES ('28', '路飞', '37756bd3cff2f04c82a0af2554a49b54', '路飞', '13712341234', '1677211770554.jpg', '男', '2023-02-24 12:09:31', '2023-02-24 12:08:40', '16', '39', '22', '20190003');
INSERT INTO `users` VALUES ('29', '艾斯', '37756bd3cff2f04c82a0af2554a49b54', '艾斯', '13478907890', '1677211820487.jpg', '男', '2023-02-24 12:10:29', '2023-02-24 12:09:58', '20', '61', '11', '20190004');
INSERT INTO `users` VALUES ('30', '伍六七', '37756bd3cff2f04c82a0af2554a49b54', '伍六七', '191000022222', '1677249457761.jpg', '男', '2023-02-24 22:37:40', '2023-02-24 22:25:27', '13', '20', '2', '20190006');
INSERT INTO `users` VALUES ('31', '梅花十三', '37756bd3cff2f04c82a0af2554a49b54', '梅花十三', '18911112222', '1677249518514.jpg', '女', '2023-02-24 22:38:39', '2023-02-24 22:38:06', '14', '31', '5', '20190008');
INSERT INTO `users` VALUES ('32', '王权富贵', '37756bd3cff2f04c82a0af2554a49b54', '王权富贵', '15623452345', '1677249844450.jpg', '男', '2023-02-24 22:44:06', '2023-02-24 22:42:40', '16', '40', '13', '20190010');

-- ----------------------------
-- Table structure for user_activity
-- ----------------------------
DROP TABLE IF EXISTS `user_activity`;
CREATE TABLE `user_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `aid` int(11) NOT NULL COMMENT '活动id',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '0' COMMENT '0未审核 1已通过 2已拒绝',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_activity
-- ----------------------------
INSERT INTO `user_activity` VALUES ('26', '29', '38', '2023-02-25 15:13:11', '2');
INSERT INTO `user_activity` VALUES ('27', '31', '38', '2023-02-26 15:44:57', '1');

-- ----------------------------
-- Table structure for user_department
-- ----------------------------
DROP TABLE IF EXISTS `user_department`;
CREATE TABLE `user_department` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `oid` int(11) NOT NULL COMMENT '社团id',
  `status` int(11) DEFAULT '0' COMMENT '0未审核 1已通过 2已拒绝',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '申请理由',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_department
-- ----------------------------
INSERT INTO `user_department` VALUES ('31', '29', '58', '1', '2023-02-25 17:02:09', '2023-02-26 16:10:47', '想要养成早说早起的好习惯');
INSERT INTO `user_department` VALUES ('32', '28', '58', '1', '2023-02-25 17:06:19', '2023-02-26 16:10:50', '早说早起身体好');
INSERT INTO `user_department` VALUES ('33', '25', '57', '1', '2023-02-25 17:11:26', '2023-02-26 16:10:59', '活到一百岁');
INSERT INTO `user_department` VALUES ('34', '26', '57', '2', '2023-02-26 15:07:23', '2023-02-26 16:10:53', '想要健康生活长命千岁！！！');

-- ----------------------------
-- Table structure for user_member
-- ----------------------------
DROP TABLE IF EXISTS `user_member`;
CREATE TABLE `user_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL COMMENT '社团 id',
  `joinTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_member
-- ----------------------------
INSERT INTO `user_member` VALUES ('33', '17', '25', '59', '2023-02-25 17:08:07', '0', '吃饭睡觉打豆豆');
INSERT INTO `user_member` VALUES ('34', '17', '26', '57', '2023-02-26 15:08:02', '1', '想干大事');

-- ----------------------------
-- Table structure for vip_info
-- ----------------------------
DROP TABLE IF EXISTS `vip_info`;
CREATE TABLE `vip_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL,
  `joinTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vip_info
-- ----------------------------
INSERT INTO `vip_info` VALUES ('27', '57', '2023-02-25 18:13:19', '30');
INSERT INTO `vip_info` VALUES ('28', '57', '2023-02-25 18:48:25', '31');
INSERT INTO `vip_info` VALUES ('30', '58', '2023-02-26 16:10:47', '29');
INSERT INTO `vip_info` VALUES ('31', '58', '2023-02-26 16:10:50', '28');
INSERT INTO `vip_info` VALUES ('32', '57', '2023-02-26 16:10:59', '25');
