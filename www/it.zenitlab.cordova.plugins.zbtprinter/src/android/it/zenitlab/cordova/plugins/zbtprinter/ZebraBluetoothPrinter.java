package it.zenitlab.cordova.plugins.zbtprinter;

import java.io.IOException;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.util.Log;
import com.zebra.sdk.comm.BluetoothConnectionInsecure;
import com.zebra.sdk.comm.Connection;
import com.zebra.sdk.comm.ConnectionException;
import com.zebra.sdk.printer.PrinterStatus;
import com.zebra.sdk.printer.ZebraPrinter;
import com.zebra.sdk.printer.ZebraPrinterFactory;
import com.zebra.sdk.printer.ZebraPrinterLanguageUnknownException;

public class ZebraBluetoothPrinter extends CordovaPlugin {

    private static final String LOG_TAG = "ZebraBluetoothPrinter";
    //String mac = "00:22:58:35:EE:4F";

    public ZebraBluetoothPrinter() {
    }

    @Override
    public boolean execute(String action,  JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals("print")) {
            try {
                String msg = args.getString(0);
                String[] parametros = msg.split("<<");
                sendData(callbackContext, parametros[0], parametros[1]);
            } catch (IOException e) {
                Log.e(LOG_TAG, e.getMessage());
                e.printStackTrace();
            }
            return true;
        }
        return false;
    }

    /*
     * This will send data to be printed by the bluetooth printer
     */
    void sendData(final CallbackContext callbackContext, final String msg, final String mac) throws IOException {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // Instantiate insecure connection for given Bluetooth MAC Address.
                    Connection thePrinterConn = new BluetoothConnectionInsecure(mac);

                    // Verify the printer is ready to print
                    if (isPrinterReady(thePrinterConn)) {

                        // Open the connection - physical connection is established here.
                        thePrinterConn.open();

                        // Send the data to printer as a byte array.
//                        thePrinterConn.write("^XA^FO0,20^FD^FS^XZ".getBytes());
                        thePrinterConn.write(msg.getBytes());


                        // Make sure the data got to the printer before closing the connection
                        Thread.sleep(500);

                        // Close the insecure connection to release resources.
                        thePrinterConn.close();
                        callbackContext.success("Stampa terminata");
                    } else {
						callbackContext.error("El printer no esta Listo");
					}
                } catch (Exception e) {
                    // Handle communications error here.
                    callbackContext.error(e.getMessage());
                }
            }
        }).start();
    }

    private Boolean isPrinterReady(Connection connection) throws ConnectionException, ZebraPrinterLanguageUnknownException {
        Boolean isOK = false;
        connection.open();
        // Creates a ZebraPrinter object to use Zebra specific functionality like getCurrentStatus()
        ZebraPrinter printer = ZebraPrinterFactory.getInstance(connection);
        PrinterStatus printerStatus = printer.getCurrentStatus();
        if (printerStatus.isReadyToPrint) {
            isOK = true;
        } else if (printerStatus.isPaused) {
            throw new ConnectionException("El Printer esta pausado.");
        } else if (printerStatus.isHeadOpen) {
            throw new ConnectionException("El Printer Tiene la Cubierta Abierta.");
        } else if (printerStatus.isPaperOut) {
            throw new ConnectionException("Falta Papel.");
        } else {
            throw new ConnectionException("No Puedo Imprimir.");
        }
        return isOK;
    }
}

