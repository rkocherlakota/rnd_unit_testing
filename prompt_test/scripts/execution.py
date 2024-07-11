from prompts import claude_human_message, claude_system_messages, interpreter_system_message
from functions import get_code_base, generate_test_cases, generate_report

# # 1)
# code_base = get_code_base("https://raw.githubusercontent.com/Python-World/python-mini-projects/master/projects/Snake%20Game/snake_game.py")

# test_cases = generate_test_cases(claude_system_messages, claude_human_message, code_base)
# report = generate_report(interpreter_system_message, test_cases, code_base)

# print(report)


# # 2)
# code_base = get_code_base("https://raw.githubusercontent.com/Python-World/python-mini-projects/master/projects/Calculate_age/calculate.py")

# test_cases = generate_test_cases(claude_system_messages, claude_human_message, code_base)
# report = generate_report(interpreter_system_message, test_cases, code_base)

# print(report)


# # 3)
# code_base = get_code_base("https://raw.githubusercontent.com/Python-World/python-mini-projects/master/projects/Battery_notification/battery.py")

# test_cases = generate_test_cases(claude_system_messages, claude_human_message, code_base)
# report = generate_report(interpreter_system_message, test_cases, code_base)

# print(report)


# # 4)
# code_base = get_code_base("https://raw.githubusercontent.com/Python-World/python-mini-projects/master/projects/Billing_system/biling_system.py")

# test_cases = generate_test_cases(claude_system_messages, claude_human_message, code_base)
# report = generate_report(interpreter_system_message, test_cases, code_base)

# print(report)