
import os

# compiles a file with a given shell command


def compileTexToPDF(name, input_directory, output_directory):
    os.system(f"cp {input_directory}/{name} {output_directory}/temp.tex")
    os.system(f"cd {output_directory} && pdflatex temp.tex")


def compileTexToHTML(name, input_directory, output_directory):
    os.system(f"cp {input_directory}/{name} {output_directory}/temp.tex")
    os.system(
        f'cd {output_directory} && ls && make4ht temp.tex "mathml,mathjax"')


if __name__ == "__main__":
    compileTexToHTML("schrodinger.tex", "filesystem", "compiled")
