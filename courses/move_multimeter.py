import sys

def move_multimeter(file_path, header_text):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if '<div class="multimetro-sim-container"' in line:
            start_idx = i
        if start_idx != -1 and i > start_idx and '          </div>' in line:
            # We are looking for the closing div of multimetro-sim-container
            # Check if beepVisual is shortly before it
            found_beep = False
            for j in range(i-10, i):
                if j > start_idx and 'id="beepVisual"' in lines[j]:
                    found_beep = True
                    break
            if found_beep:
                end_idx = i
                break

    if start_idx != -1 and end_idx != -1:
        block = lines[start_idx:end_idx+1]
        
        insert_idx = -1
        for i, line in enumerate(lines):
            if header_text in line:
                for j in range(i, -1, -1):
                    if '<section class="learning-section">' in lines[j]:
                        insert_idx = j
                        break
                break
                
        if insert_idx != -1:
            # Delete block first
            del lines[start_idx:end_idx+1]
            
            # Recalculate insert_idx since lines might have shifted
            insert_idx = -1
            for i, line in enumerate(lines):
                if header_text in line:
                    for j in range(i, -1, -1):
                        if '<section class="learning-section">' in lines[j]:
                            insert_idx = j
                            break
                    break
                    
            if insert_idx != -1:
                lines = lines[:insert_idx] + block + lines[insert_idx:]
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(lines)
                print(f'Successfully moved block in {file_path}')
            else:
                print('Could not find insert index after deletion')
        else:
            print('Could not find insert index')
    else:
        print(f'Could not find block boundaries in {file_path}')

move_multimeter('electronic_course.html', '<h2>¿Cómo operar el multímetro de forma segura?</h2>')
move_multimeter('auv_course.html', '<h2>Comprobación de las Líneas de Alimentación (BECs)</h2>')
