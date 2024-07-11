import logging 
import sys
from java.functions.input_handling import *
from java.functions.code_explanation import *
from java.functions.test_generation import *
from java.functions.tests_explanation import *
from java.functions.report_generation import *
from java.functions.modify_tests import *


def main():
    try:
        input_source = """
package com.gd;
// Java program to illustrate the
// concept of inheritance

// base class
class Bicycle {
	// the Bicycle class has two fields
	public int gear;
	public int speed;

	// the Bicycle class has one constructor
	public Bicycle(int gear, int speed)
	{
		this.gear = gear;
		this.speed = speed;
	}

	// the Bicycle class has three methods
	public void applyBrake(int decrement)
	{
		speed -= decrement;
	}

	public void speedUp(int increment)
	{
		speed += increment;
	}

	// toString() method to print info of Bicycle
	public String toString()
	{
		return ("No of gears are " + gear + "\n"
				+ "speed of bicycle is " + speed);
	}
}

// derived class
class MountainBike extends Bicycle {

	// the MountainBike subclass adds one more field
	public int seatHeight;

	// the MountainBike subclass has one constructor
	public MountainBike(int gear, int speed,
						int startHeight)
	{
		// invoking base-class(Bicycle) constructor
		super(gear, speed);
		seatHeight = startHeight;
	}

	// the MountainBike subclass adds one more method
	public void setHeight(int newValue)
	{
		seatHeight = newValue;
	}

	// overriding toString() method
	// of Bicycle to print more info
	@Override public String toString()
	{
		return (super.toString() + "\nseat height is "
				+ seatHeight);
	}
}

// driver class
public class Inheritance {
	public static void main(String args[])
	{

		MountainBike mb = new MountainBike(3, 100, 25);
		System.out.println(mb.toString());
	}
}

"""
        
        code_base, code_file_path, code_base_name = get_code_base(input_source)
        code_explanation = explain_code_base(code_base)

        test_cases, test_cases_name, test_file_name = generate_test_cases(code_base, code_base_name)
        tests_explanation = explain_test_cases(test_cases, code_base)

        final_report = generate_report(test_cases, test_cases_name, code_base)

        modified_tests, test_cases_name, test_file_name = modify_test_cases(code_base, code_base_name)
        new_tests_explanation = explain_test_cases(modified_tests, code_base)
        modified_report = generate_report(modified_tests, test_cases_name, code_base)

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()