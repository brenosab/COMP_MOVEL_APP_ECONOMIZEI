import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import UploadService from "../services/FileUploadService";
import IFile from "../domain/pages/index";

const FileInput: React.FC = () => {
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
    };
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

                setCurrentFile(undefined);
            });
    };
    useEffect(() => {
        console.log('testes');
        // UploadService.getFiles().then((response) => {
        //     setFileInfos(response.data);
        // });
    }, []);

    return (
        <View style={styles.MainContainer}>
            <View style={styles.rows}>
                <input type="file" accept="image/*" onChange={selectFile} />
            </View>
            <View style={[styles.rows]}>
                <Pressable style={styles.button} onPress={upload} disabled={!currentFile}>
                    <Text style={[styles.getStartedText, { color: 'white' }]}>Upload</Text>
                </Pressable>
            </View>
            {/* {currentFile && (
                <div className="progress my-3">
                    <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}
            {message && (
                <div className="alert alert-secondary mt-3" role="alert">
                    {message}
                </div>
            )} */}
            {/* <View style={styles.rows}>
                <div className="card mt-3">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                        {fileInfos &&
                            fileInfos.map((file, index) => (
                                <li className="list-group-item" key={index}>
                                    <a href={file.url}>{file.name}</a>
                                </li>
                            ))}
                    </ul>
                </div>
            </View> */}
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
        padding: 5,
    },
    rows: {
        flexDirection: 'row',
        flex: 1,
        padding: 2,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#868686',
    },
    input: {
        height: 40,
        borderWidth: 1,
        fontSize: 20,
        textAlign: 'center',
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