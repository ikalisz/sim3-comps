select * from users u
join user_info ui on u.user_id = ui.user_id
where username = ${username};