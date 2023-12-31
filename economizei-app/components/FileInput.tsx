import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import UploadService from "../services/FileUploadService";
import { IFile } from "../domain/pages/index";

interface Props {
    currentFile: File | undefined;
    selectFile: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const FileInput = (props: Props) => {
    const {
        currentFile,
        selectFile,
    } = props;
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

    const upload = () => {
        setProgress(0);
        if (!currentFile) return;

        UploadService.upload(currentFile, (event: any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
            .then((files) => {
                setFileInfos(files.data);
            })
            .catch((err) => {
                setProgress(0);
                if (err.response && err.response.data && err.response.data.message) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Could not upload the File!");
                }
                //setCurrentFile(undefined);
            });
    };
    useEffect(() => {
        // UploadService.getFiles().then((response) => {
        //     setFileInfos(response.data);
        // });
    }, []);

    return (
        <View style={styles.MainContainer}>
            <View style={styles.rows}>
                <input type="file" accept="image/*" onChange={selectFile} style={styles.input} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        lineHeight: 24,
        borderRadius: 10,
        borderColor: '#868686',
        borderWidth: 2,
        borderStyle: 'dotted',
    },
    rows: {
        flex: 1,
        borderRadius: 10,
        borderColor: '#868686',
    },
    input: {
        height: 40,
        margin: 10,
        padding: 10,
        width: '95%',
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 10,
        borderColor: '#868686',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    button: {
        backgroundColor: "#22252D",
        borderRadius: 10,
        margin: 2,
        padding: 2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FileInput;