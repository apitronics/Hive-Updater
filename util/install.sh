#!/bin/bash
cp /root/.Hive-Updater/util/Settings.default.js /root/.Hive-Updater/Settings.js
ln /root/.Hive-Updater/util//systemd/hive-updater.service /etc/systemd/system/multi-user.target.wants/
