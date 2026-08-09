"MODERN QA BUILD for
			A MIND FOREVER VOYAGING

This is a separate, explicitly noncanonical testing build. It includes the
unaltered Release 79 source and restores Infocom's dormant $CHEAT command so
the web edition can jump between story phases during QA. The public player
continues to load the canonical Release 79 story by default."

<CONSTANT RELEASEID 900> <VERSION EZIP>

<INSERT-FILE "../source/misc" T>
<INSERT-FILE "../source/parser" T>

<PROPDEF SIZE 5>
<PROPDEF CAPACITY 0>

<INSERT-FILE "../source/interrupts" T>
<INSERT-FILE "../source/rockvil" T>
<INSERT-FILE "../source/syntax" T>
<INSERT-FILE "../source/verbs" T>
<INSERT-FILE "../source/globals" T>
<INSERT-FILE "../source/prism" T>
<INSERT-FILE "../source/apartment" T>

<SYNTAX $CHEAT OBJECT = V-$CHEAT>

<ROUTINE V-$CHEAT ()
	 <COND (<NOT <PRSO? ,INTNUM>>
		<TELL "Try $CHEAT 1, 2 or 3." CR>)
	       (<EQUAL? ,P-NUMBER 1>
		<SETG 2051-SCORE 15>
		<SETG 2061-SCORE 25>
		<SETG 2071-SCORE 45>
		<SETG 2081-SCORE 20>
		<SETG COMPLETED-TASKS T>
		<SETG RECORDINGS-INCLUDE-SIMULATION T>
		<SETG PART-FLAG 2>
		<DISABLE <INT I-MESSAGE-C>>
		<PUTP ,RECORD-BUFFER ,P?SIZE 100>
		<TELL "QA jump: preparing the successful evidence review..." CR>
		<I-VIEW>)
	       (<EQUAL? ,P-NUMBER 2>
		<PUT ,SIM-LEVEL-TABLE 0 0>
		<TELL "QA jump: preparing the victory and epilogue..." CR>
		<SETG COMPLETED-TASKS T>
		<SETG PART-FLAG 3>
		<DISABLE <INT I-MESSAGE-C>>
		<I-WIN>)
	       (<EQUAL? ,P-NUMBER 3>
		<TELL "QA jump: Part II and all evidence simulations unlocked." CR>
		<SETG COMPLETED-TASKS T>
		<SETG PART-FLAG 2>
		<DISABLE <INT I-MESSAGE-C>>
		<PUT ,SIM-LEVEL-TABLE 0 251>
		<PUT ,SIM-LEVEL-TABLE 1 301>
		<PUT ,SIM-LEVEL-TABLE 2 401>
		<PUT ,SIM-LEVEL-TABLE 3 601>)
	       (T
		<TELL "Try $CHEAT 1, 2 or 3." CR>)>>
