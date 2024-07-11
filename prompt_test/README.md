## Task: Testing which prompting technique works well in generating test cases 


**Model:** Claude 2.1 (max_tokens=4096, temperature=0)

**System message:** Applied prompting techniques on system message

**Human message:** "Generate unit test cases for {code_base}"

**1. Zero shot**
- Language understanding
    Shows basic understanding of Python and testing concepts
- Code generation quality
    Despite the absence of process or examples, it understands the task. Could not address test cases related to edge case scenarios, and the complexity is quite basic.

**2. Few shot**
- Language understanding
    It demonstrates good understanding of Python unittest framework and testing approaches
- Code generation quality
    Covers all types of test cases, including positive, negative, and edge cases, but the complexity of test cases is relatively basic to medium.

**3. Chain of thought**
- Language understanding
    Creates effective unit test cases and demonstrates a clear logical flow in test case development.
- Code generation quality
    Covers all types of test cases (positive, negative, and edge) equally. Covers complex test scenarios but neglects basic test cases.

**4. Tree of thought**
- Language understanding
    Generates good unit test cases.
- Code generation quality
    Covers all types of test cases (positive, negative, and edge) equally. Covers complex test scenarios but neglects basic test cases.

**5. ReAct**
- Language understanding
    Generates a good number of unit test cases.
- Code generation quality
    Covers all types of test cases (positive, negative, and edge) equally. The complexity of generated test cases ranges from basic to medium level.

**6. Chain of Thought + Few shot**
- Language understanding
    Combining chaining logic and building on examples provide better results.
- Code generation quality
    Covers all types of test cases (positive, negative, and edge) equally. The complexity of generated test cases ranges from basic to complex level.



## Overall Result:

***Generating Runnable Code:*** To ensure the generation of runnable code, the prompt must specify the requirement explicitly. This ensures that the generated code is focused solely on producing test cases, eliminating any extra elements that may hinder the interpreter's execution. Without this clarity, issues may arise during execution, causing the interpreter to become stuck in resolving unrelated problems.

***Consistency:*** The script was thoroughly tested with the same codebase on multiple occasions, consistently producing nearly identical unit test cases each time. This demonstrates the reliability and stability of the code generation process.

***Code Coverage:*** It is imperative to specify that the generated test cases should aim for 100% path coverage. Failing to include this requirement may result in incomplete code coverage, hindering the overall effectiveness of the testing process.


The assistant does really well when you use "Chain of Thought" prompts because it keeps its responses organized. When you give it a few examples to start with, using "Few Shot Examples," it gets even better at generating test cases. 

The best results come when you mix both techniques - giving it examples and letting it follow a chain of thought. This helps the assistant stay on track and make better responses. So, using a combination of "Chain of Thought" and "Few Shot Examples" works best for making the assistant give good and logical answers in the test reports.




## Conclusion:

Among the various prompts experimented with, the Chain of Thought with Few Shot prompt stands out for its ability to generate unit test cases with greater complexity. This complexity is particularly crucial for our project, as it contributes significantly to the thorough testing of our codebase.

By addressing these considerations and utilizing the Chain of Thought with Few Shot prompt, we can enhance the generation of high-quality, complex unit test cases, ultimately contributing to the success of our project.