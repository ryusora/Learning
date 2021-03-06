// Main.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include "Utils.hpp"
#include "ShareAndWeakPtr.hpp"
#include "MemoryBasic.hpp"
#include "Pool.hpp"
#include "BasicString.hpp"
#include "StringFormat.hpp"
#include "StringTokenlizer.hpp"
#include "Container.hpp"
#include "DataStructure.hpp"
#include "LambdaFunction.hpp"

void line_break(std::string name = "") {
	std::cout << "\n---" << name << "---" << '\n';
}

int main()
{
	line_break("scope_ptr");
	scope_ptr();

	line_break("scope_array_ptr");
	scope_array_ptr();

	line_break("share_ptr");
	share_ptr();

	line_break("share_weak_ptr");
	runShareAndWeakLearn();

	line_break("scope_exit");
	scope_exit();

	line_break("basic_segment_pool");
	basic_segment_pool();

	line_break("object_pool");
	object_pool();

	line_break("string_algorithm");
	string_algorithm();

	line_break("string_convert");
	string_convert();

	line_break("string_format");
	string_format();

	line_break("string_tokenlizer");
	string_tokenlizer();

	line_break("bidirection_map");
	bidirection_map();

	line_break("multi_index_map");
	multi_index_map();

	line_break("circular_buffer");
	circular_buffer();

	line_break("priority_queue");
	heap();

	line_break("tuple");
	std_tuple();

	line_break("boost_option");
	boost_option();

	line_break("properties_tree");
	properties_tree();

	line_break("lambda_function");
	lambda_function();

	line_break("lambda_closure_ref");
	lambda_closure_ref();
	

    return 0;
}

