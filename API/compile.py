
import os

# compiles a file with a given shell command


def compileFile(command, name, input_directory, output_directory):

    command = "make4ht -d " + \
        output_directory + " " + input_directory + "/" + name + ' "mathml,mathjax"'
    print(command)
    os.system(command)


if __name__ == "__main__":
    compileFile("pdflatex", "schrodinger.tex", "filesystem", "compiled")

    # os.system("pdflatex filesystem/schrodinger.tex")
